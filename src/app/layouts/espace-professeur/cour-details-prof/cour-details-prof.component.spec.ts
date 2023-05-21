import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourDetailsProfComponent } from './cour-details-prof.component';

describe('CourDetailsProfComponent', () => {
  let component: CourDetailsProfComponent;
  let fixture: ComponentFixture<CourDetailsProfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourDetailsProfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourDetailsProfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
