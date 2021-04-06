import { Component, OnInit } from '@angular/core';
import { BackEndService } from '../.Services/BackEnd-service';
import { SnackBarService } from '../.Services/SnackBarService';
import { UIService } from '../.Services/UIService';

@Component({
  selector: 'app-trainer-settings',
  templateUrl: './trainer-settings.component.html',
  styleUrls: ['./trainer-settings.component.scss']
})
export class TrainerSettingsComponent implements OnInit {
  public trainer: test[] = [
    { name: 'vardas', surname: 'pavarde', email: 'asd@asd.asd', registerDate: '2020-02-10', image: 'selfie1.jpeg' }
  ]
  constructor(public uiService: UIService, public backEndService: BackEndService, private snackService: SnackBarService) {
    // console.log(this.uiService.checkWhatRole());

  }

  ngOnInit(): void {
  }

  checkIfThereIsImage(image: any) {
    if (image != '') {
      return true;
    } else {
      return false
    }
  }

  checkWithUIServiceRole(role: string) {   
    if (role == this.uiService.checkWhatRole()) {
      return true;
    }
    return false;

  }

  sendRequestToAdmin(){
    this.backEndService.sendrequestToAdminForChangingRole(this.uiService.getUserIdFromCookie()).subscribe(result =>{
      this.snackService.callSuccessSnackBar('Request sent successfully')
    }, error =>{
      this.snackService.callErrorSnackBar('Something went wrong');      
    });
  }

}

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}






export class test {
  public name;
  public surname;
  public email;
  public registerDate;
  public image;
}
