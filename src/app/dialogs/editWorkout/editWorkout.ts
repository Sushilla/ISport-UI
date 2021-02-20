import { conditionallyCreateMapObjectLiteral } from '@angular/compiler/src/render3/view/util';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BackEndService } from 'src/app/.Services/BackEnd-service';
import { WorkoutEditData } from '../../models/Workout/WorkoutEditData';

@Component({
    selector: 'editWorkout-dialog',
    templateUrl: 'editWorkout.html',
})
export class EditWorkout {
    editData = new WorkoutEditData();
    isLoaded: boolean = false;
    
    constructor(private backendService: BackEndService, @Inject(MAT_DIALOG_DATA) public data: any) {
        this.getData();
     }

    getData(){
        this.backendService.getEditDataForWorkout(this.data.id).subscribe(result=>{
            this.editData = result;
            console.log(result);
            this.isLoaded = true;
        }, error=>{
            console.log(error);
            
        })
    }

    aa(){
        console.log(this.editData);
        
    }
}