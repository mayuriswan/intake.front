import { TestBed } from '@angular/core/testing';

import { RefBodyPartsServiceService } from './ref-body-parts-service.service';

describe('RefBodyPartsServiceService', () => {
  let service: RefBodyPartsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefBodyPartsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
