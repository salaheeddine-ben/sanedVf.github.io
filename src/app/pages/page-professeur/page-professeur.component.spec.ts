import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageProfesseurComponent } from './page-professeur.component';

describe('PageProfesseurComponent', () => {
  let component: PageProfesseurComponent;
  let fixture: ComponentFixture<PageProfesseurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageProfesseurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageProfesseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
