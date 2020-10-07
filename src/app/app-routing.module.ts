import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AImodeluComponent } from './aimodelu/aimodelu.component';
import { ExercisesSelectorComponent } from './exercises-selector/exercises-selector.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MainPageComponent } from './main-page/main-page.component';
import { TrainerMainComponent } from './trainer-main/trainer-main.component';
import { TrainerRequestsComponent } from './trainer-requests/trainer-requests.component';
import { TrainerSelectorComponent } from './trainer-selector/trainer-selector.component';
import { TrainerSettingsComponent } from './trainer-settings/trainer-settings.component';
import { TrainerTrainingsComponent } from './trainer-trainings/trainer-trainings.component';
import { TrainerComponent } from './trainer/trainer.component';
import { UserMainComponent } from './user-main/user-main.component';
import { UserComponent } from './user/user.component';
import { UserStatisticsComponent } from './user-statistics/user-statistics.component'
import { UserFreemodeComponent } from './user-freemode/user-freemode.component';
import { AimoduleCollectComponent } from './aimodule-collect/aimodule-collect.component';

const routes: Routes = [
  {
    path: 'home', component: HomeComponent, children: [
      { path: 'landing', component: MainPageComponent },
      { path: 'login', component: LoginComponent }
    ]
  },
  {
    path: 'trainer', component: TrainerComponent, children: [
      { path: 'main', component: TrainerMainComponent },
      { path: 'settings', component: TrainerSettingsComponent },
      { path: 'requests', component: TrainerRequestsComponent },
      { path: 'trainings', component: TrainerTrainingsComponent },
      { path: '**', redirectTo: '/trainer/main' }
    ]
  },
  {
    path: 'user', component: UserComponent, children: [
      { path: 'main', component: UserMainComponent },
      { path: 'selector', component: TrainerSelectorComponent },
      { path: 'statistics', component: UserStatisticsComponent },
      { path: 'freemode', component: UserFreemodeComponent },
      { path: 'collect', component: AimoduleCollectComponent },
      { path: ':id', component: ExercisesSelectorComponent, },
      { path: ':id/:id', component: AImodeluComponent },
      { path: '**', redirectTo: '/user/main' }
    ]
  },
  { path: '**', redirectTo: '/home/landing' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
