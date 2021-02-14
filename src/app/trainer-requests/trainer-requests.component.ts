import { Component, OnInit } from '@angular/core';
import { BackEndService } from '../.Services/BackEnd-service';
import { UIService } from '../.Services/UIService';
import { HeaderTrainerComponent } from '../header-trainer/header-trainer.component';
import { KvietimaiToTrainer } from '../models/KvietimaiToTrainer';

@Component({
  providers: [HeaderTrainerComponent],
  selector: 'app-trainer-requests',
  templateUrl: './trainer-requests.component.html',
  styleUrls: ['./trainer-requests.component.scss']
})
export class TrainerRequestsComponent implements OnInit {
  displayedColumns: string[] = ['nameSurname', 'createionDate', 'actions'];
  req: KvietimaiToTrainer[];
  requestForTrainer: number = 10;
  isLoaded:boolean = false;
  notEmptyReq:boolean;


  constructor(private backEndService: BackEndService, private uiService: UIService) {
    this.getDataForTable();
  }

  ngOnInit(): void {
  }

  acceptButton(id: any) {
    this.backEndService.acceptTrainerRequest(id).subscribe(result =>{
      console.log(result);
      this.getNumberOfInvites();
    }, error =>{
      console.log(error);
    })
  }

  rejectButton(id: string) {
    this.backEndService.deleteTrainerRequest(id).subscribe(result => {
      console.log(result);
      this.getNumberOfInvites();
    }, error => {
      console.log(error);
    })
  }

  getDataForTable() {
    this.backEndService.getKvietimaiToTrainer(this.uiService.getUserIdFromCookie()).subscribe(result => {
      this.req = result;
      if(result.length == 0){
        this.notEmptyReq = true;
      }else{
        this.notEmptyReq = false;
      }
      
      this.isLoaded = true;
    }, error => {
      console.log(error);

    }, () => {
      this.req.forEach(element => {
        element.sukurimoData = element.sukurimoData.replace("T", " ");
      })
    })
  }

  getNumberOfInvites() {
    this.backEndService.getNumberOfRequestsToTrainer(this.uiService.getUserIdFromCookie()).subscribe(result => {
      this.requestForTrainer = result[0].yra;
      
      this.backEndService.changeRequestNumber(this.requestForTrainer);
    }, error => {
      console.log(error);

    }, () => {
      this.getDataForTable();
    })
  }

}
