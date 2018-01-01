import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KategorieDetailComponent } from './kategorie-detail.component';

describe('KategorieDetailComponent', () => {
  let component: KategorieDetailComponent;
  let fixture: ComponentFixture<KategorieDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KategorieDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KategorieDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
