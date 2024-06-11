import { TestBed } from '@angular/core/testing';

import { RefDiagnosedConditionsService } from './ref-diagnosed-conditions.service';

describe('RefDiagnosedConditionsService', () => {
  let service: RefDiagnosedConditionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefDiagnosedConditionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
