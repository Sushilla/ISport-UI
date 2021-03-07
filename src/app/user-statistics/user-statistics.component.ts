import { Component, OnInit } from '@angular/core';
import { BackEndService } from '../.Services/BackEnd-service';
import { UIService } from '../.Services/UIService';
import { UserGeneralStat } from '../models/Statistics/UserGeneralStat';

@Component({
  selector: 'app-user-statistics',
  templateUrl: './user-statistics.component.html',
  styleUrls: ['./user-statistics.component.scss']
})
export class UserStatisticsComponent implements OnInit {
  isLoaded: boolean = false;
  tblData = new UserGeneralStat();
  constructor(private backendService: BackEndService, private uiService: UIService) { }

  ngOnInit(): void {
    this.getData();
  }


  public chartType: string = 'line';

  public chartDatasets: Array<any> ;
  // = [
  //   { data: [65, 59, 80, 81, 56, 55, 40], label: 'My First dataset' },
  //   { data: [28, 48, 40, 19, 86, 27, 90], label: 'My Second dataset' }
  // ];
  public chartLabels: Array<any>;
  // public chartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

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
    },
    {
      backgroundColor: 'rgba(205, 81, 230, .2)',
      borderColor: 'rgba(0, 10, 130, .7)',
      borderWidth: 2,
    },
    {
      backgroundColor: 'rgba(133, 230, 114, .2)',
      borderColor: 'rgba(0, 10, 130, .7)',
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true
  };
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

  getData(){
    this.backendService.getUserGeneralStatistic(this.uiService.getUserIdFromCookie()).subscribe(result=>{
      console.log(result);
      this.tblData = result;
      this.chartLabels = result.chartLabels;
      this.chartDatasets = result.dataForTable;
      this.isLoaded = true;
    }, error =>{
      console.log(error);
    })
  }

}

//Vidutinis sportavimo laikas
//Vidutinis atliktų pratymų skaičius
//pasirinkto pratimo statistika -> min/max priejimai, esama. Kazkur atvaizduot vid/min/maz reiksmes (tottal)
//Bendra statisika min/max kartojimu (suma), (https://fitness-server.com/images/content/training-statistic-rus.jpg)
//Siekiama busena, paskaiciuoja nuo pirmos treniruotes (kiekviena kart +1 iki paskutines) skirtuma, randa vidurki, manau tiktu kaip siekiama :D 