import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BackEndService } from '../.Services/BackEnd-service';
import { SnackBarService } from '../.Services/SnackBarService';
import { UIService } from '../.Services/UIService';
import { MustMatch } from '../register/_helper/must-match.validator';

@Component({
  selector: 'app-trainer-settings',
  templateUrl: './trainer-settings.component.html',
  styleUrls: ['./trainer-settings.component.scss']
})
export class TrainerSettingsComponent implements OnInit {
  public trainer: test[] = [];
  changePassFormControl: FormGroup;
  minPasswordLenght = 8;
  isLoaded: boolean = false;

  constructor(public uiService: UIService, public backEndService: BackEndService, private snackService: SnackBarService, private formBuilder: FormBuilder) {
    // console.log(this.uiService.checkWhatRole());
    this.getUData();
    this.changePassFormControl = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(this.minPasswordLenght)]],
      newPasswordRepeat: ['', Validators.required]
    }, {
      validator: MustMatch('newPassword', 'newPasswordRepeat')
    })
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

  sendRequestToAdmin() {
    this.backEndService.sendrequestToAdminForChangingRole(this.uiService.getUserIdFromCookie()).subscribe(result => {
      this.snackService.callSuccessSnackBar('Request sent successfully')
    }, error => {
      this.snackService.callErrorSnackBar('Something went wrong');
    });
  }

  get f() { return this.changePassFormControl.controls; }

  getErrorMessage(errorMessage: any) {
    if (errorMessage.required) {
      return 'You must enter a value';
    }
    if (errorMessage.mustMatch) {
      return errorMessage.mustMatch ? 'New passwords must match' : '';
    }
    if (errorMessage.email) {
      return 'Incorrect email format';
    }
    return errorMessage.minlength.actualLength == this.minPasswordLenght ? '' : 'Password is too short (min 8 symbols)';
  }


  changePassword() {
    if (this.changePassFormControl.valid) {
      var temp: passChange = {
        oldPass: this.changePassFormControl.controls.oldPassword.value,
        newPass: this.changePassFormControl.controls.newPassword.value
      };
      this.backEndService.chengePassword(this.uiService.getUserIdFromCookie(), temp).subscribe(result => {
        if(result){
          this.snackService.callErrorSnackBar("Old password is incorrect")
        }else{
          this.snackService.callSuccessSnackBar("Password changed successfully");
        }

      }, error => {
        console.log(error);
        this.snackService.callErrorSnackBar('Something went wrong');
      })
    }
  }

  getUData(){
    this.backEndService.getUserData(this.uiService.getUserIdFromCookie()).subscribe(result=>{
      this.trainer = result;
      this.isLoaded = true;
    },error=>{
      console.log(error);
      
    })
  }


}

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

export class passChange {
  oldPass: string;
  newPass: string;
}






export class test {
  public vardas;
  public pavarde;
  public email;
}
