import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BackEndService } from '../.Services/BackEnd-service';
import { userNotificationToTrainer } from './userNotificationToTrainer.component';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.scss']
})
export class TrainerComponent implements OnInit {
  durationInSeconds = 5;
  needToaprove = 0;
  
  constructor(private _snackBar: MatSnackBar, private backEndServide: BackEndService) {
    this.getNumberOfInvites();
  }

  ngOnInit(): void {
  }

  openSnackBar() {
    this._snackBar.openFromComponent(userNotificationToTrainer, {
      duration: this.durationInSeconds * 1000,
      data: this.needToaprove,
      horizontalPosition: 'left',
      panelClass: ['AcceptUserSnackbar']
    });
  }

  getNumberOfInvites() {
    this.backEndServide.getNumberOfRequestsToTrainer("a82029c4-58ff-45e0-8036-4e36a437637b").subscribe(result => {
      this.needToaprove = result[0].yra;
      console.log(this.needToaprove);
      if (this.needToaprove != 0) {
        this.openSnackBar();
      }
    }, error => {
      console.log(error);

    })
  }

}

