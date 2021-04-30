import { compileNgModule } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as p5 from 'p5';
import { BackEndService } from '../.Services/BackEnd-service';
import { SnackBarService } from '../.Services/SnackBarService';
declare let ml5: any;

@Component({
  selector: 'app-aimodule-collect',
  templateUrl: './aimodule-collect.component.html',
  styleUrls: ['./aimodule-collect.component.scss']
})
export class AimoduleCollectComponent implements OnInit {
  ExerciseName: string;

  startCollectData: boolean = false;
  saveDataToFile: boolean = false;
  stopCollectData: boolean = false;
  pause: boolean = true;
  stateofexercise: boolean = false;
  trainModel: boolean = false;

  constructor(private router: Router, private snakService: SnackBarService, private backendService: BackEndService) {

  }

  ngOnInit(): void {
    const sketch = (p5: p5) => {

      let camVideo;
      let poseNet;
      let pose;
      let skeleton;

      let brain;
      let brainForTrain;
      let state = 'waiting';
      let targetLabel;

      const canHeight = 480;
      const canWidth = 640;

      let trModel = false;

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

      };

      function gotPoses(poses) {
        if (poses.length > 0) {
          pose = poses[0].pose;
          skeleton = poses[0].skeleton;
          if (state == 'collecting') {
            console.log('collecting DATA of YOU')
            let inputs = [];
            for (let i = 0; i < pose.keypoints.length; i++) {
              let x = pose.keypoints[i].position.x;
              let y = pose.keypoints[i].position.y;
              inputs.push(x);
              inputs.push(y);
            }
            let target = [targetLabel];
            brain.addData(inputs, target);
          }
        }
      }

      function modelLoaded() {
        console.log('posenet ready');
      }

      function startCollectingData(nameOfExercise, a) {
        if (a) {
          targetLabel = nameOfExercise + "_up";
        } else {
          targetLabel = nameOfExercise + "_down";
        }
        state = 'collecting';
      }
      //model TRAIN ------------------------------------------------------------------------------------------------
      function ModelTrain() {
        console.log(true);
        let optionsTrain = {
          inputs: 34,
          outputs: 4,
          task: 'classification',
          debug: true,
          layers: [ //gal nereik :D
            {
              type: 'dense',
              units: 32,
              activation: 'relu'
            },
            {
              type: 'dense',
              units: 16,
              activation: 'relu'
            },
            {
              type: 'dense',
              activation: 'sigmoid'
            }
          ] //
        }
        brainForTrain = ml5.neuralNetwork(optionsTrain);
        brainForTrain.loadData('assets/training/exerciseList.json', dataReadyTrain)
      }

      function dataReadyTrain() {
        brainForTrain.normalizeData();
        let epochsCount = 60;
        brainForTrain.train({ epochs: epochsCount }, finishedTrain);
      }

      function finishedTrain() {
        console.log('model trained');
        brainForTrain.save();
      }
      //------------------------------------------------------------------------------------------------------------

      p5.draw = () => {
        trModel = this.trainModel;
        if (trModel) {
          this.trainModel = false;
          ModelTrain();
        }


        if (this.startCollectData) { //data colecting
          if (!this.pause) { //collect if data collecting is not paused
            startCollectingData(this.ExerciseName, this.stateofexercise);
          } else { //paused coolecting
            state = 'waiting';
          }
        } else { //data not collecting
          state = 'waiting';
          if (this.stopCollectData) { //pres STOP Button (clear Input)
            this.stopCollectData = !this.stopCollectData;
            this.ExerciseName = "";
          }
        }
        // console.log(state)





        if (this.saveDataToFile) { //save Data to file
          this.saveDataToFile = !this.saveDataToFile;
          if (!this.startCollectData) { //only if collecting completed
            brain.saveData('exerciseList');
            this.sendToBack();
          }
        }

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
        let a = '';
        if (!this.pause) {
          p5.fill('rgb(0,255,0)')
          a = 'collecting'
        } else {
          p5.fill('red')
          a = 'not collecting'
        }


        p5.textSize(80);
        p5.text(a, 20, 400);
        p5.textSize(50);
        p5.text(targetLabel, 20, 50); //gal nereiks


      }
    };

    new p5(sketch);

  }


  surinktosTreniruotes: string[] = [];

  startCollecting() {
    if (this.ExerciseName != undefined && this.ExerciseName != "") {
      this.surinktosTreniruotes.push(this.ExerciseName);
      this.startCollectData = true;
      this.pause = false;
      // this.pause = !this.pause; jei reikia ant start clickint kad sustopint
    } else {
      this.snakService.callWarningSnackBar("Please, insert the name of an exercise")
    }

  }

  saveCollectedDataToFile() {
    this.saveDataToFile = true;
  }

  stopCollecting() {
    this.startCollectData = false;
    this.stopCollectData = true;
    // this.pause = false; veliau i tai pakeisti
    this.pause = true;

  }

  pauseCollecting() {
    this.pause = true;
  }

  updown() {
    this.stateofexercise = !this.stateofexercise;
  }

  trainModelFromData() {
    if (this.pause) {
      this.trainModel = true;
    } else {
      this.snakService.callErrorSnackBar("You can't train model, while collecting data");
    }
  }

  sendToBack() {

    var send: exPav = new exPav();
    send.Pavadinimas = this.surinktosTreniruotes;
    this.surinktosTreniruotes = [];

    // this.backendService.sendPratimaiListToDB(send).subscribe(result => {
    //   this.snakService.callSuccessSnackBar("Data added to Database successfully");
    // }, error => {
    //   this.snakService.callErrorSnackBar("Something went wrong");
    // })


  }

}

export class exPav {
  Pavadinimas: string[];
}
