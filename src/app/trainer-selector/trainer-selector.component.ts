import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TrainerSelectorModel } from '../models/TrainerSelectorModel'

import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { BackEndService } from '../.Services/BackEnd-service';
import { TrainerListForAdding } from '../models/TrainerListForAdding';
import { RequestToAddTrainerKvietimas } from '../models/RequestToAddTrainerKvietimas';

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
  trId: string;
  canSendRequestToTrainer = false;

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
    if(this.trainerList.findIndex(c => c.email == value) == -1){
      this.canSendRequestToTrainer = false;
      this.trId = "";
    }else{
      this.canSendRequestToTrainer = true;      
      this.trId = this.trainerList.find(c => c.email == value).id
    }  
    return this.options.filter(optiona => optiona.toLowerCase().includes(filterValue));
  }

  redirectToTrainerExcercise(id: string) {
    this.router.navigateByUrl(`/user/${id}`)
  }

  sendRequestToTrainer(){
    if(this.canSendRequestToTrainer){

      var sendRequest = new Array<RequestToAddTrainerKvietimas>();
      var req = new RequestToAddTrainerKvietimas();
      req.trenerioID = this.trId;
      req.vartotojoId = "40c0f599-a2a4-4727-9e5f-d941ba9ec063";
      sendRequest.push(req)
      console.log(sendRequest);
      this.backend.putKvietimasTreneriIDraugus(req).subscribe(result => {
        console.log(result);
      }, error => {
        console.log(error);
        
      })
    }else{
      console.log("kazkas blogai");
      
    }
    
  }

}
