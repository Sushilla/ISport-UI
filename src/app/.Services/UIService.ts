import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { StoreLogedInUserDataToCookie } from "../models/StoreLogedInUserDataToCookie";
import isEmail from 'validator/lib/isEmail';

@Injectable()
export class UIService {
  constructor(private router: Router, private cookieService: CookieService) {
  }


  public checkIfUserLoggedIn() {
    if (this.cookieService.check("UserCookie")) {
      var cookie: StoreLogedInUserDataToCookie;
      cookie = JSON.parse(this.cookieService.get("UserCookie"));
      if (cookie[0].pavadinimas == "Trainer") {
        this.router.navigateByUrl("/trainer/main");
      } else if (cookie[0].pavadinimas == "Admin") {
        this.router.navigateByUrl("/admin/main");
      } else {
        this.router.navigateByUrl("/user/main");
      }
    }
  }

  public checkWhatRole(): string {
    if (this.cookieService.check("UserCookie")) {
      var cookie: StoreLogedInUserDataToCookie;
      cookie = JSON.parse(this.cookieService.get("UserCookie"));
      return cookie[0].pavadinimas;
    }
  }

  public logOffFromAccount() {
    this.cookieService.delete("UserCookie", '/')
    this.router.navigateByUrl('/home/landing');
  }

  public getUserIdFromCookie(): string {
    var cookie: StoreLogedInUserDataToCookie;
    cookie = JSON.parse(this.cookieService.get("UserCookie"));  
    return cookie[0].id;
  }

  public redirectToHome(){
    this.router.navigateByUrl("/home/landing");
  }

}