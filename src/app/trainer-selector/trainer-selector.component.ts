import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TrainerSelectorModel } from '../models/TrainerSelectorModel'

import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { BackEndService } from '../.Services/BackEnd-service';
import { TrainerListForAdding } from '../models/TrainerListForAdding';
import { RequestToAddTrainerKvietimas } from '../models/RequestToAddTrainerKvietimas';
import { AcceptedTrainersList } from '../models/AcceptedTrainersList';
import { CookieService } from 'ngx-cookie-service';
import { UIService } from '../.Services/UIService';
import { SnackBarService } from '../.Services/SnackBarService';

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
  acceptedTrainerList: AcceptedTrainersList;

  constructor(private router: Router, public backend: BackEndService, public cookieService: CookieService, private uiService: UIService, private snackService: SnackBarService) {
    this.getListOfTrainers();
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
      req.vartotojoId = this.uiService.getUserIdFromCookie();
      sendRequest.push(req)
      // console.log(sendRequest);
      this.backend.putKvietimasTreneriIDraugus(req).subscribe(result => {
        this.snackService.callSuccessSnackBar('Request send to trainer')
      }, error => {
        this.snackService.callErrorSnackBar('Something went wrong');
        
      })
    }else{
      this.snackService.callWarningSnackBar('This trainer email not exist');
      
    }
    
  }

  getListOfTrainers(){
    this.backend.getTrainerWhoAcceptedMyInvite(this.uiService.getUserIdFromCookie()).subscribe(result => {
      this.acceptedTrainerList = result;      
      console.log(this.acceptedTrainerList); 
    }, error => {
      console.log(error);
      
    })
  }

}
