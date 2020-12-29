import { Component, OnInit } from '@angular/core';
import { BackEndService } from '../.Services/BackEnd-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(public backEndService: BackEndService) { }

  ngOnInit(): void {
  }

  loginUser(){
    console.log(this.email);
    console.log(this.password);
    
    this.backEndService.loginUser(this.email, this.password).subscribe(result=>{
      console.log(result);
    }, error =>{
      console.log(error);
      
    })
  }

}
