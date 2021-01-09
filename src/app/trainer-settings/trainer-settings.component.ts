import { Component, OnInit } from '@angular/core';
import { UIService } from '../.Services/UIService';

@Component({
  selector: 'app-trainer-settings',
  templateUrl: './trainer-settings.component.html',
  styleUrls: ['./trainer-settings.component.scss']
})
export class TrainerSettingsComponent implements OnInit {
  public trainer: test[] = [
    { name: 'vardas', surname: 'pavarde', email: 'asd@asd.asd', registerDate: '2020-02-10', image: 'selfie1.jpeg' }
  ]
  tiles: Tile[] = [
    { text: 'One', cols: 3, rows: 1, color: 'lightblue' },
    { text: 'Two', cols: 1, rows: 2, color: 'lightgreen' },
    { text: 'Three', cols: 1, rows: 1, color: 'lightpink' },
    { text: 'Four', cols: 2, rows: 1, color: '#DDBDF1' },
  ];
  constructor(public uiService: UIService) {
    // console.log(this.uiService.checkWhatRole());

  }

  ngOnInit(): void {
  }

  checkIfThereIsImage(image: any) {
    if (image != '') {
      return true;
    } else {
      return false
    }
  }

  checkWithUIServiceRole(role: string) {   
    if (role == this.uiService.checkWhatRole()) {
      return true;
    }
    return false;

  }

}

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}






export class test {
  public name;
  public surname;
  public email;
  public registerDate;
  public image;
}
