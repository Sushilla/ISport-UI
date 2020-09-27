import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-trainer',
  templateUrl: './header-trainer.component.html',
  styleUrls: ['./header-trainer.component.scss']
})
export class HeaderTrainerComponent implements OnInit {

  @Input() Requests: string;
  
  constructor() { }

  ngOnInit(): void {
  }

  isThereAnyRequests(num:any){
    if(num == 0){
      return false;
    }else{
      return true;
    }
  }

}
