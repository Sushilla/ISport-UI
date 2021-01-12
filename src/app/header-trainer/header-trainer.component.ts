import { Component, Input, OnInit } from '@angular/core';
import { BackEndService } from '../.Services/BackEnd-service';
import { UIService } from '../.Services/UIService';

@Component({
  selector: 'app-header-trainer',
  templateUrl: './header-trainer.component.html',
  styleUrls: ['./header-trainer.component.scss']
})

export class HeaderTrainerComponent implements OnInit {

  @Input() Requests: number;

  constructor(private backEndService: BackEndService, public uiService:UIService) {
  }

  ngOnInit(): void {
    // this.getNumberOfInvites();
    this.backEndService.currentRequestNumber.subscribe(m => this.Requests = m)

  }

  logoff(){
    this.uiService.logOffFromAccount();
  }

  isThereAnyRequests(num: any) {
    if (num == 0) {
      return false;
    } else {
      return true;
    }
  }

  getNumberOfInvites() {
    this.backEndService.getNumberOfRequestsToTrainer(this.uiService.getUserIdFromCookie()).subscribe(result => {
      this.Requests = result[0].yra;
      console.log(this.Requests);
    }, error => {
      console.log(error);

    })
  }

}
