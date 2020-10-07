import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TrainerSelectorModel } from '../models/TrainerSelectorModel'

import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-trainer-selector',
  templateUrl: './trainer-selector.component.html',
  styleUrls: ['./trainer-selector.component.scss']
})
export class TrainerSelectorComponent implements OnInit {
  public trainers: TrainerSelectorModel[] = new Array<TrainerSelectorModel>();

  myControl = new FormControl();
  options: string[] = ['Tomas@pas.asd', 'Two@asdassa.ss', 'Three@asdashd.s'];
  filteredOptions: Observable<string[]>;

  constructor(private router: Router) {
    this.trainers.push(new TrainerSelectorModel('id1', 'Tomas', 'Pavardenis', 'assets/img/selfie1.jpeg'));
    this.trainers.push(new TrainerSelectorModel('id2', 'Jonas', 'Kazkurislavas', 'assets/img/selfie2.jpg'));
  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  redirectToTrainerExcercise(id: string) {
    this.router.navigateByUrl(`/user/${id}`)
  }

}
