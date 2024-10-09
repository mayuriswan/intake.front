import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntakeDetailComponent } from './intake-detail.component';

describe('IntakeDetailComponent', () => {
  let component: IntakeDetailComponent;
  let fixture: ComponentFixture<IntakeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntakeDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntakeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
