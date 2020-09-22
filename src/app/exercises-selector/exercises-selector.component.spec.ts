import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExercisesSelectorComponent } from './exercises-selector.component';

describe('ExercisesSelectorComponent', () => {
  let component: ExercisesSelectorComponent;
  let fixture: ComponentFixture<ExercisesSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExercisesSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExercisesSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
