import { TestBed } from '@angular/core/testing';

import { RefRecentlyNoticedService } from './ref-recently-noticed.service';

describe('RefRecentlyNoticedService', () => {
  let service: RefRecentlyNoticedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefRecentlyNoticedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
