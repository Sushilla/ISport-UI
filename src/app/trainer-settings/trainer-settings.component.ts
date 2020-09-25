import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trainer-settings',
  templateUrl: './trainer-settings.component.html',
  styleUrls: ['./trainer-settings.component.scss']
})
export class TrainerSettingsComponent implements OnInit {
  public trainer: test[] = [
    { name: 'vardas', surname: 'pavarde', email: 'asd@asd.asd', registerDate: '2020-02-10', image: 'selfie1.jpeg' }
  ]
  constructor() {
    // this.trainer.push(new TrainerSelectorModel('id1', 'Tomas', 'Pavardenis', 'assets/img/selfie1.jpeg'));
  }

  ngOnInit(): void {
  }

  checkIfThereIsImage(image: any) {
    if(image != ''){
      return true;
    }else{
      return false
    }
  }

}
export class test {
  public name;
  public surname;
  public email;
  public registerDate;
  public image;
}
