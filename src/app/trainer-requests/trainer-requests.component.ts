import { Component, OnInit } from '@angular/core';
import { BackEndService } from '../.Services/BackEnd-service';
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


  constructor(private backEndService: BackEndService) {
    this.getDataForTable();
  }

  ngOnInit(): void {
    // this.backEndService.currentMessage.subscribe(m => this.message = m)
  }

  acceptButton(id: any) {
    // console.log(id)       
    // this.backEndService.changeRequestNumber(this.requestForTrainer);
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
    this.backEndService.getKvietimaiToTrainer("a82029c4-58ff-45e0-8036-4e36a437637b").subscribe(result => {
      this.req = result;
    }, error => {
      console.log(error);

    }, () => {
      this.req.forEach(element => {
        element.sukurimoData = element.sukurimoData.replace("T", " ");
      })
    })
  }

  getNumberOfInvites() {
    this.backEndService.getNumberOfRequestsToTrainer("a82029c4-58ff-45e0-8036-4e36a437637b").subscribe(result => {
      this.requestForTrainer = result[0].yra;
      this.backEndService.changeRequestNumber(this.requestForTrainer);
    }, error => {
      console.log(error);

    }, () => {
      this.getDataForTable();
    })
  }

}
