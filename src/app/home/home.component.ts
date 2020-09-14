import { Component, OnInit } from '@angular/core';
import * as p5 from 'p5';
import MyCircle from "./MyCircle";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const sketch = (p5: p5) => {
      // DEMO: Prepare an array of MyCircle instances
      const myCircles: MyCircle[] = [];
    
      // The sketch setup method 
      p5.setup = () => {
        // Creating and positioning the canvas
        const canvas = p5.createCanvas(200, 200);
        canvas.parent("app");
    
        // Configuring the canvas
        p5.background("red");
    
        // DEMO: Create three circles in the center of the canvas
        for (let i = 1; i < 4; i++) {
          const p = p5.width / 4;
          const circlePos = p5.createVector(p * i, p5.height / 2);
          const size = i % 2 !== 0 ? 24 : 32;
          myCircles.push(new MyCircle(p5, circlePos, size));
        }
      };
    
      // The sketch draw method
      p5.draw = () => {
        // DEMO: Let the circle instances draw themselves
        myCircles.forEach(circle => circle.draw());
      };
    };
    
    new p5(sketch);
  
  }

}
