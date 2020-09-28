import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFreemodeComponent } from './user-freemode.component';

describe('UserFreemodeComponent', () => {
  let component: UserFreemodeComponent;
  let fixture: ComponentFixture<UserFreemodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFreemodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFreemodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
