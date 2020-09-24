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
import {SlideshowModule} from 'ng-simple-slideshow';

// material angular
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSliderModule} from '@angular/material/slider';

import { AImodeluComponent } from './aimodelu/aimodelu.component';
import { TrainerSelectorComponent } from './trainer-selector/trainer-selector.component';
import { TrainerComponent } from './trainer/trainer.component';
import { UserComponent } from './user/user.component';
import { ExercisesSelectorComponent } from './exercises-selector/exercises-selector.component';

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
    ExercisesSelectorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    SlideshowModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
