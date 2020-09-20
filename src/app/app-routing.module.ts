import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AImodeluComponent } from './aimodelu/aimodelu.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MainPageComponent } from './main-page/main-page.component';

const routes: Routes = [
  {
    path: 'home', component: HomeComponent, children: [
      {path: 'landing', component: MainPageComponent},
      {path: 'login', component: LoginComponent},
      {path: 'ai', component: AImodeluComponent}
    ]
  },
  { path: '**', redirectTo: '/home/landing' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
