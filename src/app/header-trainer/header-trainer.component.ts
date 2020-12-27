import { Component, Input, OnInit } from '@angular/core';
import { BackEndService } from '../.Services/BackEnd-service';

@Component({
  selector: 'app-header-trainer',
  templateUrl: './header-trainer.component.html',
  styleUrls: ['./header-trainer.component.scss']
})

export class HeaderTrainerComponent implements OnInit {

  @Input() Requests: number;

  constructor(private backEndService: BackEndService) {
  }

  ngOnInit(): void {
    // this.getNumberOfInvites();
    this.backEndService.currentRequestNumber.subscribe(m => this.Requests = m)

  }

  isThereAnyRequests(num: any) {
    if (num == 0) {
      return false;
    } else {
      return true;
    }
  }

  getNumberOfInvites() {
    this.backEndService.getNumberOfRequestsToTrainer("a82029c4-58ff-45e0-8036-4e36a437637b").subscribe(result => {
      this.Requests = result[0].yra;
      console.log(this.Requests);
    }, error => {
      console.log(error);

    })
  }

}
