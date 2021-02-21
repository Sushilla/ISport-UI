import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { from } from 'rxjs';
import { AreYouSure } from '../dialogs/AreYouSure/AreYouSure';
import { CreateNewWorkout } from '../dialogs/createWorkout/createNewWorkout';
import { EditWorkout } from '../dialogs/editWorkout/editWorkout';
import { UsersAddedToWorkout } from '../models/UsersAddedToWorkout';
import { TrainersWorkoutPlans } from '../models/TrainersWorkoutPlans';
import { BackEndService } from '../.Services/BackEnd-service';
import { UIService } from '../.Services/UIService';
import { TreniruoteTreneris } from '../models/TreniruoteTreneris';
@Component({
  selector: 'app-trainer-trainings',
  templateUrl: './trainer-trainings.component.html',
  styleUrls: ['./trainer-trainings.component.scss']
})
export class TrainerTrainingsComponent implements OnInit {
  users: UsersAddedToWorkout[];
  treniruotes: TreniruoteTreneris[];

  constructor(public dialog: MatDialog, private backendService: BackEndService, private uiService: UIService) { }

  ngOnInit(): void {
    this.getTreniruotesForShowing();
  }

  getSelectedWorkoutUsers(workId: string){
    this.backendService.getSelectedWorkoutUsers(workId).subscribe(result=>{
      this.users = result;
    }, error=>{
      console.log(error);
    })
  }

  openCreateDialog(){
    const dialogRef = this.dialog.open(CreateNewWorkout);

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if (result) {
        this.getTreniruotesForShowing();
      }
    });
  }

  openAreYouSureDialog(id: any){
    const dialogRef = this.dialog.open(AreYouSure);

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if (result) {
        console.log('delete')
        this.backendService.deleteWorkout(id).subscribe(result=>{
          console.log(result);
          this.getTreniruotesForShowing();
        }, error=>{
          console.log(error);
        })
      }
    });
  }

  openEditDialog(id: any){    
    const dialogRef = this.dialog.open(EditWorkout, {data: {id: id}});

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if (result) {
        this.getTreniruotesForShowing();
      }
    });
  }

  getTreniruotesForShowing(){
    this.backendService.getTrainerCreatedExercises(this.uiService.getUserIdFromCookie()).subscribe(result=>{
      this.treniruotes = result;      
    }, error=>{
      console.log(error);
      
    })
  }

}