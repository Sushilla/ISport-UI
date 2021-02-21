import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackEndService } from '../.Services/BackEnd-service';
import { UIService } from '../.Services/UIService';
import { ExcerciseSelectorModel } from '../models/ExcerciseSelectorModel';

@Component({
  selector: 'app-exercises-selector',
  templateUrl: './exercises-selector.component.html',
  styleUrls: ['./exercises-selector.component.scss']
})
export class ExercisesSelectorComponent implements OnInit {
  public excercises: ExcerciseSelectorModel[] = new Array<ExcerciseSelectorModel>();
  idOfTrainer: string;
  constructor(private router: Router, private backendService: BackEndService, private uiService: UIService) {
    this.idOfTrainer = window.location.pathname.split('user/')[1];
    console.log(this.idOfTrainer)

    // this.excercises.push(new ExcerciseSelectorModel('id3', 'Treniruotes krutinems', 10));
    // this.excercises.push(new ExcerciseSelectorModel('id1', 'Treniruote nugarai', 42));
    // this.excercises.push(new ExcerciseSelectorModel('id2', 'Treniruotes kojoms', 73));
    // this.excercises.push(new ExcerciseSelectorModel('id3', 'Treniruotes krutinems', 99));
    // this.excercises.push(new ExcerciseSelectorModel('id3', 'Treniruotes krutinems', 100));
  }

  ngOnInit(): void {
    this.getWorkoutList();
  }

  redirectToTrainerExcercise(id: string) {
    this.router.navigateByUrl(`${window.location.pathname}/${id}`)
  }

  setTypeBeProgress(progress: number) {
    if (progress == 100) {
      return "green";
    } else if (progress >= 75) {
      return "cyan";
    } else if (progress >= 50) {
      return "yellow";
    } else if (progress >= 25) {
      return "orange";
    } else {
      return "red";
    }

  }

  getWorkoutList() {
    this.backendService.getUserWorkouts(this.idOfTrainer, this.uiService.getUserIdFromCookie()).subscribe(result => {
      result.forEach(element => {
        element.sukurimoData = element.sukurimoData.replace("T", " ");
      })
      this.excercises = result;
    }, error => {
      console.log(error);

    })
  }

}
