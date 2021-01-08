import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { StoreLogedInUserDataToCookie } from "../models/StoreLogedInUserDataToCookie";

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
        // this.router.navigateByUrl();
      } else {
        this.router.navigateByUrl("/user/main");
      }
    }
  }

  canActivate(val: any): boolean {
    if (this.cookieService.check("UserCookie")) {
      var cookie: StoreLogedInUserDataToCookie;
      cookie = JSON.parse(this.cookieService.get("UserCookie"));
      if (cookie[0].pavadinimas == val.data.role[0]) {
        return true;
      }
    }
    this.router.navigateByUrl('/home/login');
    return true;
  }

  public checkWhatRole(): string {
    if (this.cookieService.check("UserCookie")) {
      var cookie: StoreLogedInUserDataToCookie;
      cookie = JSON.parse(this.cookieService.get("UserCookie"));
      return cookie[0].pavadinimas;
    }
  }
}