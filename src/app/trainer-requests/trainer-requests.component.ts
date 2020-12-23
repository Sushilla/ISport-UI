import { Component, OnInit } from '@angular/core';
import { BackEndService } from '../.Services/BackEnd-service';
import { KvietimaiToTrainer } from '../models/KvietimaiToTrainer';
import { UserRequestSeletorModel } from '../models/UserRequestSeletorModel'

@Component({
  selector: 'app-trainer-requests',
  templateUrl: './trainer-requests.component.html',
  styleUrls: ['./trainer-requests.component.scss']
})
export class TrainerRequestsComponent implements OnInit {
  displayedColumns: string[] = ['nameSurname', 'createionDate', 'actions'];
  public requests: UserRequestSeletorModel[] = [
    { id: '1', name: "vardas1", surname: "pavarde1", createionDate: "2020-02-05 15:05:10" },
    { id: '2', name: "vardas2", surname: "pavarde2", createionDate: "2020-02-05 15:05:10" },
    { id: '3', name: "vardas3", surname: "pavarde3", createionDate: "2020-02-05 15:05:10" },
    { id: '4', name: "vardas4", surname: "pavarde4", createionDate: "2020-02-05 15:05:10" },
    { id: '5', name: "vardas5", surname: "pavarde5", createionDate: "2020-02-05 15:05:10" }
  ]
  req: KvietimaiToTrainer[];

  constructor(private backEndService: BackEndService) { 
    // console.log(this.requests) 
    this.backEndService.getKvietimaiToTrainer("a82029c4-58ff-45e0-8036-4e36a437637b").subscribe(result =>{
      this.req = result;
      
    }, error =>{
      console.log(error);
      
    }, ()=> {
      this.req.forEach(element =>{
        element.sukurimoData = element.sukurimoData.replace("T", " ");
      })
    })

  }

  ngOnInit(): void {
  }

  acceptButton(id: any) {
    console.log(id)
  }
  rejectButton(id: any) {
    console.log(id)
  }

}
