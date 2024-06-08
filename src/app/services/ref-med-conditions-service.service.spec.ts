import { TestBed } from '@angular/core/testing';

import { RefMedConditionsServiceService } from './ref-med-conditions-service.service';

describe('RefMedConditionsServiceService', () => {
  let service: RefMedConditionsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefMedConditionsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
