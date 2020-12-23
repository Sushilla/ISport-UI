import { Component, NgZone, OnInit } from '@angular/core';
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

  constructor(private backEndService: BackEndService, private test: HeaderTrainerComponent) {
    // console.log(this.requests) 
    this.getDataForTable();

  }

  ngOnInit(): void {
  }

  acceptButton(id: any) {
    console.log(id)

  }
  rejectButton(id: string) {
    this.backEndService.deleteTrainerRequest(id).subscribe(result => {
      console.log(result);
    }, error => {
      console.log(error);
    }, () => {
        // this.test.getNumberOfInvites();
        // this.getDataForTable();
        this.test.Requests = 100;
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

}
