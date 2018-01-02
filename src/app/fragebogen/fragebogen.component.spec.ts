import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FragebogenComponent } from './fragebogen.component';

describe('FragebogenComponent', () => {
  let component: FragebogenComponent;
  let fixture: ComponentFixture<FragebogenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FragebogenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FragebogenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
