import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { from } from 'rxjs';
import { AreYouSure } from '../dialogs/AreYouSure/AreYouSure';
import { CreateNewWorkout } from '../dialogs/createWorkout/createNewWorkout';
import { EditWorkout } from '../dialogs/editWorkout/editWorkout';
import { UsersAddedToWorkout } from '../models/UsersAddedToWorkout';
import { TrainersWorkoutPlans } from '../models/TrainersWorkoutPlans';
@Component({
  selector: 'app-trainer-trainings',
  templateUrl: './trainer-trainings.component.html',
  styleUrls: ['./trainer-trainings.component.scss']
})
export class TrainerTrainingsComponent implements OnInit {
  typesOfShoes: string[] = ['Treniruote nugarai', 'Treniruote kojoms', 'Treniruote krutinei'];
  displayedColumns: string[] = ['title', 'actions'];
  trainings: TrainersWorkoutPlans[] = [
    { id: '1', title: 'title1aasddddd title1aasddd dd' },
    { id: '2', title: 'title2' },
    { id: '3', title: 'title3' },
    { id: '4', title: 'Treniruote kazkam tokiam kad reikia' },
    { id: '5', title: 'title5' }
  ]

  users: UsersAddedToWorkout[] = [
    {id: '1', name: 'vardenis', surname: 'pavardenis'},
    {id: '2', name: 'Robertas', surname: 'pavardenis'},
    {id: '3', name: 'Alina', surname: 'pavardenis'},
    {id: '3', name: 'Danielius', surname: 'pavardenis'},
    {id: '4', name: 'Karina', surname: 'pavardenis'},
    {id: '5', name: 'Aliona', surname: 'pavardenis'},
    {id: '6', name: 'Darius', surname: 'pavardenis'}
  ]
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  editTraining(id: any) {
    console.log(id)
  }











  openCreateDialog(){
    const dialogRef = this.dialog.open(CreateNewWorkout, {
      // data: { toDialog, schema },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if (result) {
        // this.reloadTableFromSelectedType();
      }
    });
  }

  openAreYouSureDialog(id: any){
    const dialogRef = this.dialog.open(AreYouSure);

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if (result) {
        console.log('delete')
        // this.reloadTableFromSelectedType();
      }
    });
  }

  openEditDialog(id: any){
    const dialogRef = this.dialog.open(EditWorkout);

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if (result) {
        console.log('delete')
        // this.reloadTableFromSelectedType();
      }
    });
  }






}