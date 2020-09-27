import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerRequestsComponent } from './trainer-requests.component';

describe('TrainerRequestsComponent', () => {
  let component: TrainerRequestsComponent;
  let fixture: ComponentFixture<TrainerRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainerRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
