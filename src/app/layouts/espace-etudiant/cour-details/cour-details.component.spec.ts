import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourDetailsComponent } from './cour-details.component';

describe('CourDetailsComponent', () => {
  let component: CourDetailsComponent;
  let fixture: ComponentFixture<CourDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
