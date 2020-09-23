import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TrainerSelectorModel } from '../models/TrainerSelectorModel'

@Component({
  selector: 'app-trainer-selector',
  templateUrl: './trainer-selector.component.html',
  styleUrls: ['./trainer-selector.component.scss']
})
export class TrainerSelectorComponent implements OnInit {
  public trainers: TrainerSelectorModel[] = new Array<TrainerSelectorModel>();

  constructor(private router: Router) {
    this.trainers.push(new TrainerSelectorModel('id1', 'Tomas', 'Pavardenis', 'assets/img/selfie1.jpeg'));
    this.trainers.push(new TrainerSelectorModel('id2', 'Jonas', 'Kazkurislavas', 'assets/img/selfie2.jpg'));
   }

  ngOnInit(): void {
  }

  redirectToTrainerExcercise(id: string) {
    this.router.navigateByUrl(`/user/${id}`)
  }

}
