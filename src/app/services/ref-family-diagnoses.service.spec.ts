import { TestBed } from '@angular/core/testing';

import { RefFamilyDiagnosesService } from './ref-family-diagnoses.service';

describe('RefFamilyDiagnosesService', () => {
  let service: RefFamilyDiagnosesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefFamilyDiagnosesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
