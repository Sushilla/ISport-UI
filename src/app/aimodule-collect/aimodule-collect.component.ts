import { Component, OnInit } from '@angular/core';
import * as p5 from 'p5';
declare let ml5: any;

@Component({
  selector: 'app-aimodule-collect',
  templateUrl: './aimodule-collect.component.html',
  styleUrls: ['./aimodule-collect.component.scss']
})
export class AimoduleCollectComponent implements OnInit {

  constructor() { }

  asd(){
    console.log(false)
  }

  ngOnInit(): void {
    const sketch = (p5: p5) => {
      function asdd(){
        console.log("clicked SAVE button");
      }
      let camVideo;
      let poseNet;
      let pose;
      let skeleton;

      let brain;
      let state = 'waiting';
      let targetLabel;

      // p5.keyPressed = () => {
      //   if (p5.key == 's') {
      //     brain.saveData();
      //   } else {
      //     targetLabel = p5.key;
      //     setTimeout(() => {
      //       state = 'collecting';
      //       console.log(state);
      //       setTimeout(() => {
      //         console.log('not collecting');
      //         state = 'waiting';
      //       }, 10000);
      //     }, 1000);
      //   }
      // }

      const canHeight = 480;
      const canWidth = 640;

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

      p5.draw = () => {
        
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
      }
    };

    new p5(sketch);

  }
}
