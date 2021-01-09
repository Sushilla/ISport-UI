import { ResourceLoader } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BackEndService } from '../.Services/BackEnd-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }



}
