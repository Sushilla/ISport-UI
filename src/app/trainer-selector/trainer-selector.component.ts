import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TrainerSelectorModel } from '../models/TrainerSelectorModel'

import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { BackEndService } from '../.Services/BackEnd-service';
import { TrainerListForAdding } from '../models/TrainerListForAdding';

@Component({
  selector: 'app-trainer-selector',
  templateUrl: './trainer-selector.component.html',
  styleUrls: ['./trainer-selector.component.scss']
})
export class TrainerSelectorComponent implements OnInit {
  public trainers: TrainerSelectorModel[] = new Array<TrainerSelectorModel>();

  myControl = new FormControl();
  options: string[] = [];
  trainerList: TrainerListForAdding[];
  filteredOptions: Observable<string[]>;

  constructor(private router: Router, public backend: BackEndService) {
    this.trainers.push(new TrainerSelectorModel('id1', 'Tomas', 'Pavardenis', 'assets/img/selfie1.jpeg'));
    this.trainers.push(new TrainerSelectorModel('id2', 'Jonas', 'Kazkurislavas', 'assets/img/selfie2.jpg'));
  }

  ngOnInit() {
    this.backend.getTrainerListForAddingTrainer().subscribe(result =>{
      this.trainerList = result;

      result.forEach(element => {
        this.options.push(element.email);
      });
      

      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value)));
        
    }, error => {
      console.log(error);        
    })





  }

  private _filter(value: string): string[] {   
    const filterValue = value.toLowerCase(); 
    // console.log(this.trainerList.find(x => x.email == value))
  

    return this.options.filter(optiona => optiona.toLowerCase().includes(filterValue));
  }

  redirectToTrainerExcercise(id: string) {
    this.router.navigateByUrl(`/user/${id}`)
  }

}
