import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trainer-trainings',
  templateUrl: './trainer-trainings.component.html',
  styleUrls: ['./trainer-trainings.component.scss']
})
export class TrainerTrainingsComponent implements OnInit {
  typesOfShoes: string[] = ['Treniruote nugarai', 'Treniruote kojoms', 'Treniruote krutinei'];
  displayedColumns: string[] = ['title', 'actions'];
  trainings: tt[] = [
    { id: '1', title: 'title1aasddddd title1aasddd dd' },
    { id: '2', title: 'title2' },
    { id: '3', title: 'title3' },
    { id: '4', title: 'Treniruote kazkam tokiam kad reikia' },
    { id: '5', title: 'title5' }
  ]

  users: vart[] = [
    {id: '1', name: 'vardenis', surname: 'pavardenis'},
    {id: '2', name: 'Robertas', surname: 'pavardenis'},
    {id: '3', name: 'Alina', surname: 'pavardenis'},
    {id: '3', name: 'Danielius', surname: 'pavardenis'},
    {id: '4', name: 'Karina', surname: 'pavardenis'},
    {id: '5', name: 'Aliona', surname: 'pavardenis'},
    {id: '6', name: 'Darius', surname: 'pavardenis'}
  ]
  constructor() { }

  ngOnInit(): void {
  }

  editTraining(id: any) {
    console.log(id)
  }

  removeTraining(id: any) {
    console.log(id)
  }
}
export class tt {
  public id: string;
  public title: string;
}
export class vart {
  public id: string;
  public name: string;
  public surname: string;
}