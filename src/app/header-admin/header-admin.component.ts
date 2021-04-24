import { Component, OnInit } from '@angular/core';
import { UIService } from '../.Services/UIService';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.scss']
})
export class HeaderAdminComponent implements OnInit {

  constructor(public uiService: UIService) { }

  ngOnInit(): void {
  }

  logoff(){
    this.uiService.logOffFromAccount();
  }

}
