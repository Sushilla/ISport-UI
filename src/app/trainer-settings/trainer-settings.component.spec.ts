import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerSettingsComponent } from './trainer-settings.component';

describe('TrainerSettingsComponent', () => {
  let component: TrainerSettingsComponent;
  let fixture: ComponentFixture<TrainerSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainerSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
