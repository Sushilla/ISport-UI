import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { StoreLogedInUserDataToCookie } from "../models/StoreLogedInUserDataToCookie";

@Injectable()
export class Authguard {
  constructor(private router: Router, private cookieService: CookieService) {
  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.cookieService.check("UserCookie")) {
      var cookie: StoreLogedInUserDataToCookie;
      cookie = JSON.parse(this.cookieService.get("UserCookie"));
      if (cookie[0].pavadinimas == route.data.role[0]) {
        return true;
      }
    }
    this.router.navigateByUrl('/home/login');
    return true;
  }

}