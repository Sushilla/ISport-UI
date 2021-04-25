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
import { SnackBarService } from '../.Services/SnackBarService';
@Component({
  selector: 'app-trainer-trainings',
  templateUrl: './trainer-trainings.component.html',
  styleUrls: ['./trainer-trainings.component.scss']
})
export class TrainerTrainingsComponent implements OnInit {
  users: UsersAddedToWorkout[];
  treniruotes: TreniruoteTreneris[];
  wId: string;

  //table
  public chartType: string = 'line';
  public chartDatasets: Array<any>;
  public chartDatasetsAverage: Array<any>;
  public chartLabels: Array<any>;
  public chartColors: Array<any> = [
    {
      backgroundColor: 'rgba(105, 0, 132, .2)',
      borderColor: 'rgba(200, 99, 132, .7)',
      borderWidth: 2,
    },
    {
      backgroundColor: 'rgba(0, 137, 132, .2)',
      borderColor: 'rgba(0, 10, 130, .7)',
      borderWidth: 2,
    }
  ];



  constructor(public dialog: MatDialog, private backendService: BackEndService, private uiService: UIService, private snackService: SnackBarService) { }

  ngOnInit(): void {
    this.getTreniruotesForShowing();
  }

  getSelectedWorkoutUsers(workId: string) {
    this.wId = workId;
    this.backendService.getSelectedWorkoutUsers(workId).subscribe(result => {
      this.users = result;
    }, error => {
      console.log(error);
    })
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(CreateNewWorkout);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getTreniruotesForShowing();
      }
    });
  }

  openAreYouSureDialog(id: any) {
    const dialogRef = this.dialog.open(AreYouSure);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.backendService.deleteWorkout(id).subscribe(result => {
          this.snackService.callSuccessSnackBar('Workout removed successfully');
          this.getTreniruotesForShowing();
        }, error => {
          this.snackService.callErrorSnackBar('Something went wrong');
        })
      }
    });
  }

  openEditDialog(id: any) {
    const dialogRef = this.dialog.open(EditWorkout, { data: { id: id } });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getTreniruotesForShowing();
      }
    });
  }

  getTreniruotesForShowing() {
    this.backendService.getTrainerCreatedExercises(this.uiService.getUserIdFromCookie()).subscribe(result => {
      this.treniruotes = result;
    }, error => {
      console.log(error);

    })
  }

  getSelectedUserStat(uId: string) {        
    this.backendService.getUserStatisticForTrainer(uId, this.wId).subscribe(result => {
      // console.log(result);
      this.chartLabels = result.chartLabels;
      this.chartDatasets = result.dataForTable;
      this.chartDatasetsAverage = result.dataForTable2;
    }, error => {
      console.log(error);

    })
  }


  public chartOptions: any = {
    responsive: true
  };
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

}