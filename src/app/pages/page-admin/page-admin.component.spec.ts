import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageadminComponent } from './page-admin.component';

describe('DashboardComponent', () => {
  let component: PageadminComponent;
  let fixture: ComponentFixture<PageadminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageadminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
