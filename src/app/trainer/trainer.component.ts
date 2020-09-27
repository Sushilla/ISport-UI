import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { userNotificationToTrainer } from './userNotificationToTrainer.component';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.scss']
})
export class TrainerComponent implements OnInit {
  durationInSeconds = 5;
  needToaprove = 0;
  constructor(private _snackBar: MatSnackBar) {
    if (this.needToaprove != 0) {
      this.openSnackBar();
    }

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

}

