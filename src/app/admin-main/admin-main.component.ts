import { Component, OnInit } from '@angular/core';
import { BackEndService } from '../.Services/BackEnd-service';
import { SnackBarService } from '../.Services/SnackBarService';
import { UIService } from '../.Services/UIService';
import { PakeistiRoleListForAdmin } from '../models/PakeistiRoleListForAdmin';

@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.scss']
})
export class AdminMainComponent implements OnInit {
  displayedColumns: string[] = ['nameSurname', 'createionDate', 'actions'];
  req: PakeistiRoleListForAdmin[];
  constructor(private backEndService: BackEndService, private uiService: UIService, private snackService: SnackBarService) { }

  ngOnInit(): void {
    this.getListOfUsersWhoWnatToBecomeTrainer();
  }

  getListOfUsersWhoWnatToBecomeTrainer(){    
    this.backEndService.getListForChangingRole().subscribe(result=>{
      this.req = result;
      console.log(this.req);
      
    }, error =>{
      console.log(error);      
    }, () => {
      this.req.forEach(element => {
        element.sukurimoData = element.sukurimoData.replace("T", " ");
      })
    })
  }

  acceptButton(id: any) {    
    this.backEndService.adminApproveUserToBecomeTrainer(id).subscribe(result =>{
      console.log(result);
      this.getListOfUsersWhoWnatToBecomeTrainer();
    }, error =>{
      console.log(error);
    })
  }

  rejectButton(id: string) {
    this.backEndService.adminRejectUserFromBecomingTrainer(id).subscribe(result => {
      console.log(result);
      this.getListOfUsersWhoWnatToBecomeTrainer();
    }, error => {
      console.log(error);
    })
  }

}
