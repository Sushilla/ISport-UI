import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { MainPageComponent } from './main-page/main-page.component';
import { LoginComponent } from './login/login.component';

//instaled
import { SlideshowModule } from 'ng-simple-slideshow';

// material angular
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



import { AImodeluComponent } from './aimodelu/aimodelu.component';
import { TrainerSelectorComponent } from './trainer-selector/trainer-selector.component';
import { TrainerComponent } from './trainer/trainer.component';
import { UserComponent } from './user/user.component';
import { ExercisesSelectorComponent } from './exercises-selector/exercises-selector.component';
import { TrainerMainComponent } from './trainer-main/trainer-main.component';
import { HeaderTrainerComponent } from './header-trainer/header-trainer.component';
import { TrainerSettingsComponent } from './trainer-settings/trainer-settings.component';
import { userNotificationToTrainer } from './trainer/userNotificationToTrainer.component';
import { TrainerRequestsComponent } from './trainer-requests/trainer-requests.component';
import { TrainerTrainingsComponent } from './trainer-trainings/trainer-trainings.component';
import { HeaderUserComponent } from './header-user/header-user.component';
import { UserMainComponent } from './user-main/user-main.component';
import { UserStatisticsComponent } from './user-statistics/user-statistics.component';
import { UserFreemodeComponent } from './user-freemode/user-freemode.component';
import { WorkoutSelector } from './header-user/workoutSelector.component';
import { AimoduleCollectComponent } from './aimodule-collect/aimodule-collect.component';
import { CreateNewWorkout } from './dialogs/createWorkout/createNewWorkout';
import { AreYouSure } from './dialogs/AreYouSure/AreYouSure';
import { EditWorkout } from './dialogs/editWorkout/editWorkout';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    MainPageComponent,
    LoginComponent,
    AImodeluComponent,
    TrainerSelectorComponent,
    TrainerComponent,
    UserComponent,
    ExercisesSelectorComponent,
    TrainerMainComponent,
    HeaderTrainerComponent,
    TrainerSettingsComponent,
    userNotificationToTrainer,
    TrainerRequestsComponent,
    TrainerTrainingsComponent,
    HeaderUserComponent,
    UserMainComponent,
    UserStatisticsComponent,
    UserFreemodeComponent,
    WorkoutSelector,
    AimoduleCollectComponent,
    CreateNewWorkout,
    AreYouSure,
    EditWorkout
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    SlideshowModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatSliderModule,
    MatIconModule,
    MatGridListModule,
    MatSnackBarModule,
    MatBadgeModule,
    MatTableModule,
    MatButtonModule,
    MatListModule,
    MatMenuModule,
    MatChipsModule,
    MatDialogModule,
    MatTooltipModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
