import {Component, Inject} from '@angular/core';
import {MAT_SNACK_BAR_DATA} from '@angular/material/snack-bar';

@Component({
    selector: 'SnackError-dialog',
    templateUrl: 'SnackError.html',
})

export class SnackError {
    constructor(@Inject(MAT_SNACK_BAR_DATA) public data: string) { }
    
}
