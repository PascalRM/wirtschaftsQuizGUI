import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KontoKategorieComponent } from './konto-kategorie.component';

describe('KontoKategorieComponent', () => {
  let component: KontoKategorieComponent;
  let fixture: ComponentFixture<KontoKategorieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KontoKategorieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KontoKategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
