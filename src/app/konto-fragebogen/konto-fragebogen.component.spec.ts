import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KontoFragebogenComponent } from './konto-fragebogen.component';

describe('KontoFragebogenComponent', () => {
  let component: KontoFragebogenComponent;
  let fixture: ComponentFixture<KontoFragebogenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KontoFragebogenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KontoFragebogenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
