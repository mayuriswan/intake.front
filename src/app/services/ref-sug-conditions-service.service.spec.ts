import { TestBed } from '@angular/core/testing';

import { RefSugConditionsServiceService } from './ref-sug-conditions-service.service';

describe('RefSugConditionsServiceService', () => {
  let service: RefSugConditionsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefSugConditionsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
