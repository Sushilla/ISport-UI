import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'snack-bar-component-example-snack',
  templateUrl: 'userNotificationToTrainer.html',
  styles: [`
      .example-pizza-party {
        color: hotpink;
      }
    `],
})
export class userNotificationToTrainer {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any, private router: Router, private _snackBar: MatSnackBar) { }

  goToAcceptUsers() {
    this._snackBar.dismiss();
    this.router.navigateByUrl(`/trainer/requests`)
  }
}