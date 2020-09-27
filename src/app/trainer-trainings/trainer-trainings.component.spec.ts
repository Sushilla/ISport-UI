import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerTrainingsComponent } from './trainer-trainings.component';

describe('TrainerTrainingsComponent', () => {
  let component: TrainerTrainingsComponent;
  let fixture: ComponentFixture<TrainerTrainingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainerTrainingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerTrainingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
