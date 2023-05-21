import { TestBed } from '@angular/core/testing';

import { VisioconferanceService } from './visioconferance.service';

describe('VisioconferanceService', () => {
  let service: VisioconferanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisioconferanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
