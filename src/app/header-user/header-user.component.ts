import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UIService } from '../.Services/UIService';
import { WorkoutSelector } from '../header-user/workoutSelector.component'
@Component({
  selector: 'app-header-user',
  templateUrl: './header-user.component.html',
  styleUrls: ['./header-user.component.scss']
})
export class HeaderUserComponent implements OnInit {

  constructor(public dialog: MatDialog, public uiService: UIService) { }

  ngOnInit(): void {
  }

  openDialog() {
    const dialogRef = this.dialog.open(WorkoutSelector);

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }

  logoff(){
    this.uiService.logOffFromAccount();
  }

}
