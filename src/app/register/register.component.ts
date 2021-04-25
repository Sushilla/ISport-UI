import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BackEndService } from '../.Services/BackEnd-service';
import { UIService } from '../.Services/UIService';
import { MustMatch } from './_helper/must-match.validator';
import { registerData } from '../models/registerData';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registreFormControl: FormGroup;
  minPasswordLenght = 1;
  accountAlreadyExist: boolean = false;
  submitted = false;


  constructor(public uiService: UIService, private formBuilder: FormBuilder, private backEndSercice: BackEndService, private cookieService: CookieService) {
    this.uiService.checkIfUserLoggedIn();
  }

  ngOnInit(): void {
    this.registreFormControl = this.formBuilder.group({
      vardas: ['', Validators.required],
      pavarde: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(this.minPasswordLenght)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    })
  }

  get f() { return this.registreFormControl.controls; }


  getErrorMessage(errorMessage: any) {
    if (errorMessage.required) {
      return 'You must enter a value';
    }
    if (errorMessage.mustMatch) {
      return errorMessage.mustMatch ? 'Password must match' : '';
    }
    if (errorMessage.email) {
      return 'Incorrect email format';
    }
    return errorMessage.minlength.actualLength == this.minPasswordLenght ? '' : 'Password is to short';
  }

  onSubmit() {
    this.submitted = true;
    if (this.registreFormControl.valid) {
      console.log(true);
      let regData = new registerData();
      console.log(this.registreFormControl.value)
      regData.email = this.registreFormControl.value.email;
      regData.password = this.registreFormControl.value.password;
      regData.vardas = this.registreFormControl.value.vardas;
      regData.pavarde = this.registreFormControl.value.pavarde;

      this.backEndSercice.registerUser(regData).subscribe(result => {
        if(result.length != 0){ //created
          this.cookieService.set("UserCookie", JSON.stringify(result), {expires: 7, path: "/"});
          this.uiService.checkIfUserLoggedIn();      
        }else{//exisdt
          this.accountAlreadyExist = true;
        }
      }, error => {
        console.log(error);
      })
    }
  }

}
