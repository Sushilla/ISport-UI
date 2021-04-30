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

  public chartLabels: Array<any>;

  public chartColors: Array<any> = [
    {
      backgroundColor: 'rgba(148, 0, 186, .2)',
      borderColor: 'rgba(222, 82, 128, .7)',
      borderWidth: 2,
    },
    {
      backgroundColor: 'rgba(119, 255, 0, .2)',
      borderColor: 'rgba(0, 199, 27, .7)',
      borderWidth: 2,
    },
    {
      backgroundColor: 'rgba(255, 208, 0, .2)',
      borderColor: 'rgba(255, 162, 0, .7)',
      borderWidth: 2,
    },
    {
      backgroundColor: 'rgba(255, 0, 38, .2)',
      borderColor: 'rgba(255, 0, 38, .7)',
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