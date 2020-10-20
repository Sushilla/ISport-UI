import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AimoduleTrainingComponent } from './aimodule-training.component';

describe('AimoduleTrainingComponent', () => {
  let component: AimoduleTrainingComponent;
  let fixture: ComponentFixture<AimoduleTrainingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AimoduleTrainingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AimoduleTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
