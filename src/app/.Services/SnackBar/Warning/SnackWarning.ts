import {Component, Inject} from '@angular/core';
import {MAT_SNACK_BAR_DATA} from '@angular/material/snack-bar';

@Component({
    selector: 'SnackWarning-dialog',
    templateUrl: 'SnackWarning.html',
})

export class SnackWarning {
    constructor(@Inject(MAT_SNACK_BAR_DATA) public data: string) { }
    
}
