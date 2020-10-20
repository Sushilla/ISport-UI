import { EventListenerFocusTrapInertStrategy } from '@angular/cdk/a11y';
import { Component, OnInit } from '@angular/core';
import * as p5 from 'p5';
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
  constructor() {
    var trainerAndExcercise = window.location.pathname.split('user/')[1];
    this.idOfTrainer = trainerAndExcercise.split('/')[0];
    this.idOfExcercise = trainerAndExcercise.split('/')[1];

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
      p5.setup = () => {
        // let test = p5.select('.tttt');
        // const canvas = p5.createCanvas(test.width, canHeight);
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
        console.log(results[0].confidence)
        if (results[0].confidence > 0.8) {
          poseLabel = results[0].label;
        }
          classifyPose();
      }

      function classifyPose() {
        if (pose) {
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
        // let test = p5.select('.tttt');
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
        p5.text(poseLabel, 20, 400);
      }

      // p5.windowResized = () => {
      //   // let test = p5.select('.tttt');
      //   p5.resizeCanvas(test.width, canHeight);
      // }
    };

    new p5(sketch);

  }

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