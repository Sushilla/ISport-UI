import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'dialog-content-example-dialog',
    templateUrl: 'workoutSelector.html',
})
export class WorkoutSelector {
    constructor(public router: Router) { }

    redirectToTrainerSelector() {
        this.router.navigateByUrl(`/user/selector`)
    }
    startFreeMode(){
        this.router.navigateByUrl(`/user/freemode`)

    }
}