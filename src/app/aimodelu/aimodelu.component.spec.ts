import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AImodeluComponent } from './aimodelu.component';

describe('AImodeluComponent', () => {
  let component: AImodeluComponent;
  let fixture: ComponentFixture<AImodeluComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AImodeluComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AImodeluComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
