import { TestBed } from '@angular/core/testing';

import { MedicalIntakeService } from './medical-intake.service';

describe('MedicalIntakeService', () => {
  let service: MedicalIntakeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicalIntakeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
