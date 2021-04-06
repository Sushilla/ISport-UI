import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackError } from './SnackBar/Error/SnackError';
import { SnackSuccess } from './SnackBar/Success/SnackSuccess';
import { SnackWarning } from './SnackBar/Warning/SnackWarning';

@Injectable()
export class SnackBarService {

  snackDurationInSeconds = 3;

  constructor( private _snackBar: MatSnackBar) {
  }

  public callSuccessSnackBar(text: string) {
    this._snackBar.openFromComponent(SnackSuccess, {
        data: text,
        duration: this.snackDurationInSeconds * 1000,
        panelClass: ['succes-snackbar']
    })
}
public callWarningSnackBar(text: string) {
    this._snackBar.openFromComponent(SnackWarning, {
        data: text,
        duration: this.snackDurationInSeconds * 1000,
        panelClass: ['warning-snackbar']
    })
}
public callErrorSnackBar(text: string) {
    this._snackBar.openFromComponent(SnackError, {
        data: text,
        duration: this.snackDurationInSeconds * 1000,
        panelClass: ['error-snackbar']
    })
}

}