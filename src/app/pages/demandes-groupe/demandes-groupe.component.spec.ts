import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandesGroupeComponent } from './demandes-groupe.component';

describe('DemandesGroupeComponent', () => {
  let component: DemandesGroupeComponent;
  let fixture: ComponentFixture<DemandesGroupeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandesGroupeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemandesGroupeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
