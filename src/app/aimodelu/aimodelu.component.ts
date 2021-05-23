import { EventListenerFocusTrapInertStrategy } from '@angular/cdk/a11y';
import { Component, OnInit } from '@angular/core';
import * as p5 from 'p5';
import { BackEndService } from '../.Services/BackEnd-service';
import { SnackBarService } from '../.Services/SnackBarService';
import { UIService } from '../.Services/UIService';
import MyCircle from "./MyCircle";
declare let ml5: any;

@Component({
  selector: 'app-aimodelu',
  templateUrl: './aimodelu.component.html',
  styleUrls: ['./aimodelu.component.scss']
})
export class AImodeluComponent implements OnInit {
  idOfTrainer: string;
  idOfExcercise: string;
  isStarted: boolean = false;
  time: number = 0;
  display;
  interval;
  needToDoExercides: needTo[] = new Array<needTo>();
  displayedColumns: string[] = ['pavadinimas', 'priejimai', 'skaicius', 'padare'];

  constructor(private backendService: BackEndService, private uiService: UIService, private snackBar: SnackBarService) {
    var trainerAndExcercise = window.location.pathname.split('user/')[1];
    this.idOfTrainer = trainerAndExcercise.split('/')[0];
    this.idOfExcercise = trainerAndExcercise.split('/')[1];
    this.getWorkoutData();

  }

  ngOnInit(): void {
    const sketch = (p5: p5) => {
      let camVideo;
      let poseNet;
      let pose;
      let skeleton;

      let brain;
      let poseLabel;
      const canHeight = 480;
      const canWidth = 640;

      let lastPose = "";
      let lastPoseSide = "";
      let countas = 0;

      let workStarted = false;
      let workStat = [];
      let firstRun = true;

      p5.setup = () => {
        const canvas = p5.createCanvas(canWidth, canHeight);
        canvas.parent("AIcomponent");
        camVideo = p5.createCapture(p5.VIDEO);
        camVideo.hide();
        poseNet = ml5.poseNet(camVideo, modelLoaded);
        poseNet.on('pose', gotPoses)

        let options = {
          inputs: 34,
          outputs: 4,
          task: 'classification',
          debug: true
        }
        brain = ml5.neuralNetwork(options);

        const modelList = {
          model: 'assets/training/model/model.json',
          metadata: 'assets/training/model/model_meta.json',
          weights: 'assets/training/model/model.weights.bin',
        };
        brain.load(modelList, brainReady);
      };

      function brainReady() {
        console.log('pose clasification ready');
        classifyPose();
      }

      function gotResult(error, results) {
        if (results[0].confidence >= 0.9) {
          // console.log(results[0].confidence)
          poseLabel = results[0].label;
          //tikrint kuris pratimas

          if (results[0].label == "Armsup_up" || results[0].label == "Armsup_down") { //armsup exercice

            // let confidenceThreshold = 0.8;
            // let downHeightTolerance = 150;
            // let upHeightTolerance = 70;
            // let leftYDist;
            // let rightYDist;

            // function jointDistEvaluateShoulderWrist(joint1, joint2, confidenceThreshold) {
            //   let jointDist = null;
            //   if (pose.keypoints[joint1].score >= confidenceThreshold && pose.keypoints[joint2].score >= confidenceThreshold) {
            //     jointDist = pose.keypoints[joint1].position.y - pose.keypoints[joint2].position.y;
            //   }
            //   return jointDist;
            // }

            // // distance between shoulders and wrists
            // leftYDist = jointDistEvaluateShoulderWrist(5, 9, confidenceThreshold);
            // rightYDist = jointDistEvaluateShoulderWrist(6, 10, confidenceThreshold);

            // if ((Math.abs(leftYDist) >= downHeightTolerance) || (Math.abs(rightYDist) >= downHeightTolerance)) {
            //   poseLabel = "Armsup_down";
            // }
            // else if ((Math.abs(leftYDist) <= upHeightTolerance) || (Math.abs(rightYDist) <= upHeightTolerance)) {
            //   poseLabel = "Armsup_up";
            // }
            if (lastPose == "Armsup_up" && poseLabel == "Armsup_down") {
              lastPoseSide = "";
              let ExName = poseLabel.split('_')[0];
              if (workStat.findIndex(c => c.pavadinimas == ExName) != -1) { //patikrint ar yra toks pratymas
                workStat.find(c => c.pavadinimas == ExName).done++; // pridet
              }

            }

            lastPose = poseLabel;
          }



          if (results[0].label == "Squat_up" || results[0].label == "Squat_down") {
            // let confidenceThreshold = 0.8;
            // let downHeightTolerance = 70;
            // let YDist;
            //dist ankle and hip
            // function jointDistEvaluateAnkleHip(joint1, joint2, confidenceThreshold) {
            //   let jointDist = null;
            //   if (pose.keypoints[joint1].score >= confidenceThreshold && pose.keypoints[joint2].score >= confidenceThreshold) {
            //     jointDist = pose.keypoints[joint1].position.y - pose.keypoints[joint2].position.y;
            //   }
            //   return jointDist;
            // }
            // YDist = jointDistEvaluateAnkleHip(15, 11, confidenceThreshold);

            // if ((Math.abs(YDist) >= downHeightTolerance)) {
            //   poseLabel = "Squat_up";
            // }
            // else {
            //   poseLabel = "Squat_down";
            // }
            if (lastPose == "Squat_up" && poseLabel == "Squat_down") {
              lastPoseSide = "";
              let ExName = poseLabel.split('_')[0];
              if (workStat.findIndex(c => c.pavadinimas == ExName) != -1) { //patikrint ar yra toks pratymas
                workStat.find(c => c.pavadinimas == ExName).done++; // pridet
              }
            }
            lastPose = poseLabel;
          }



          if (results[0].label == "Sidebend_left" || results[0].label == "Sidebend_right") {
            lastPose = "";
            if ((lastPoseSide == "Sidebend_left" && poseLabel == "Sidebend_right") || (lastPoseSide == "Sidebend_right" && poseLabel == "Sidebend_left")) {
              let ExName = "Sidebend";
              if (workStat.findIndex(c => c.pavadinimas == ExName) != -1) { //patikrint ar yra toks pratymas
                workStat.find(c => c.pavadinimas == ExName).done++; // pridet
              }
            }
            lastPoseSide = poseLabel;
          }
          if (results[0].label == "Jumping jacks_up" || results[0].label == "Jumping jacks_down" || (lastPoseSide == "Jumping jacks_up" && poseLabel == "Armsup_down")) {
            if ((lastPoseSide == "Jumping jacks_up" && poseLabel == "Jumping jacks_down") || (lastPoseSide == "Jumping jacks_up" && poseLabel == "Armsup_down")) {
              lastPose = "";
              let ExName = "Jumping jacks";
              if (workStat.findIndex(c => c.pavadinimas == ExName) != -1) { //patikrint ar yra toks pratymas
                workStat.find(c => c.pavadinimas == ExName).done++; // pridet
              }
            }
            lastPoseSide = poseLabel;
          }
        }
        classifyPose();
      }

      function classifyPose() {
        if (pose) {// && workStarted tik kai started IMPORTANT
          let inputs = [];
          for (let i = 0; i < pose.keypoints.length; i++) {
            let x = pose.keypoints[i].position.x;
            let y = pose.keypoints[i].position.y;
            inputs.push(x);
            inputs.push(y);
          }
          brain.classify(inputs, gotResult);
        } else {
          setTimeout(classifyPose, 100);
        }
      }

      function gotPoses(poses) {
        if (poses.length > 0) {
          pose = poses[0].pose;
          skeleton = poses[0].skeleton;
        }
      }

      function modelLoaded() {
        console.log('posenet ready');
      }

      p5.draw = () => {
        p5.push();
        p5.translate(camVideo.width, 0);
        p5.scale(-1, 1);
        p5.background(122);
        p5.image(camVideo, 0, 0);
        if (pose) {
          for (let i = 0; i < skeleton.length; i++) {
            let a = skeleton[i][0];
            let b = skeleton[i][1];
            p5.strokeWeight(2);
            p5.stroke(0);
            p5.line(a.position.x, a.position.y, b.position.x, b.position.y);
          }
          for (let i = 0; i < pose.keypoints.length; i++) {
            let x = pose.keypoints[i].position.x;
            let y = pose.keypoints[i].position.y;
            p5.fill(0);
            p5.stroke(255);
            p5.ellipse(x, y, 16, 16);
          }
        }
        p5.pop();
        p5.textSize(70);
        // p5.text(poseLabel, 20, 400);
        // p5.textSize(90);

        // p5.text(lastPoseSide, 20, 200);
        // p5.text(countas, 20, 100);
        workStarted = this.isStarted;
        if (workStarted) { //started workout
          if (firstRun) {
            firstRun = false;
            workStat = this.needToDoExercides;
          }
          this.needToDoExercides = workStat;
        }
        // if(p5.frameCount >=20){
        //   p5.frameCount=0;
        // }
      }
    };

    new p5(sketch);

  }
  //----------------------------------------------------------------------------------------------------------------------------------------------

  startWorkout() {
    console.log('workout started');
    var exId;
    this.backendService.currentWorkoutas.subscribe(res => {
      exId = res;
    })
    if (exId == '') {
      this.interval = setInterval(() => {
        if (this.time === 0) {
          this.time++;
        } else {
          this.time++;
        }
        this.display = this.transform(this.time)
      }, 1000);
      var temp: createWorkoutUsingUserId = { vartotojoId: this.uiService.getUserIdFromCookie() }
      this.backendService.startWorkout(temp).subscribe(result => {
        this.snackBar.callSuccessSnackBar('Workout started');

        this.backendService.changecurrentWorkoutas(result);
        this.backendService.currentWorkoutas.subscribe(res => {
          console.log(res);
        })

      }, error => {
        this.snackBar.callErrorSnackBar('Something went wrong');
      })


      this.isStarted = true;
    } else {
      this.snackBar.callErrorSnackBar('Workout is already started')
    }

  }

  endWorkout() {
    console.log('workout ended');
    clearInterval(this.interval);
    this.time = 0;

    // console.log(this.backendService.getcurrentWorkoutas());
    var exId;
    this.backendService.currentWorkoutas.subscribe(res => {
      exId = res;
    })
    console.log(exId);

    var statistData: stat[] = new Array<stat>();
    var exerciseList: statData[] = new Array<statData>();


    this.needToDoExercides.forEach(element => {
      console.log(element);
      var siun = new stat();
      var pad = new statData();

      pad.treniruotesId = this.idOfExcercise;
      pad.statistikosId = exId;
      pad.atpazyntoPratymoId = element.pratymoId;
      pad.priejimas = 1; //gal paliekam kolkas viena :DD
      pad.skaicius = element.done;
      exerciseList.push(pad);

      siun.statistikaData = exerciseList;
      statistData.push(siun)
    })

    this.backendService.endWorkout(exId, statistData[0]).subscribe(result => {
      this.snackBar.callSuccessSnackBar('Workout ended');
    }, error => {
      this.snackBar.callErrorSnackBar('Something went wrong');
    })

    this.isStarted = false;
  }

  transform(value: number): string {
    var sec_num = value;
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours < 1) { hours = 0; }
    if (minutes < 1) { minutes = 0; }
    if (seconds < 1) { seconds = 0; }
    return hours + ':' + minutes + ':' + seconds;
  }

  getWorkoutData() {
    this.backendService.getWorkoutExercises(this.idOfExcercise).subscribe(result => {
      this.needToDoExercides = result;
      // console.log(result);

      this.needToDoExercides.forEach(element => {
        element.done = 0;
      })
      // console.log(this.needToDoExercides);

    }, error => {
      console.log(error);
    })
  }

  checkIfDone(need: number, done: number) {
    if (done >= need)
      return 'doneExercises';
  }

}

export class createWorkoutUsingUserId {
  vartotojoId: string;
}


export class statData {
  treniruotesId: string;
  statistikosId: string;
  atpazyntoPratymoId: string;
  priejimas: number;
  skaicius: number;
}

export class stat {
  statistikaData: statData[];
}

export class needTo {
  pavadinimas: string;
  pratymoId: string;
  treniruotesId: string;
  priejimai: number;
  skaicius: number;
  done: number;
}









      // const myCircles: MyCircle[] = [];

      // // The sketch setup method 
      // p5.setup = () => {
      //   // Creating and positioning the canvas
      //   const canvas = p5.createCanvas(200, 200);
      //   canvas.parent("app");

      //   // Configuring the canvas
      //   p5.background("red");

      //   // DEMO: Create three circles in the center of the canvas
      //   for (let i = 1; i < 4; i++) {
      //     const p = p5.width / 4;
      //     const circlePos = p5.createVector(p * i, p5.height / 2);
      //     const size = i % 2 !== 0 ? 24 : 32;
      //     myCircles.push(new MyCircle(p5, circlePos, size));
      //   }
      // };

      // // The sketch draw method
      // p5.draw = () => {
      //   // DEMO: Let the circle instances draw themselves
      //   myCircles.forEach(circle => circle.draw());
      // };