import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AimoduleCollectComponent } from './aimodule-collect.component';

describe('AimoduleCollectComponent', () => {
  let component: AimoduleCollectComponent;
  let fixture: ComponentFixture<AimoduleCollectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AimoduleCollectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AimoduleCollectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
