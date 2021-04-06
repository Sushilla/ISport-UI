import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BackEndService } from '../.Services/BackEnd-service';
import { SnackBarService } from '../.Services/SnackBarService';
import { UIService } from '../.Services/UIService';
import { StoreLogedInUserDataToCookie } from '../models/StoreLogedInUserDataToCookie';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  userInfo: StoreLogedInUserDataToCookie;

  constructor(public backEndService: BackEndService, public cookieService: CookieService, public router: Router, public uiService: UIService, private snackService: SnackBarService) {
    this.uiService.checkIfUserLoggedIn();
   }

  ngOnInit(): void {
  }

  loginUser(){    
    this.backEndService.loginUser(this.email, this.password).subscribe(result=>{
      this.cookieService.set("UserCookie", JSON.stringify(result), {expires: 7, path: "/"});
      this.uiService.checkIfUserLoggedIn();
    }, error =>{
      console.log(error);
      this.snackService.callErrorSnackBar('Email or password is incorrect');
    })
  }



}
