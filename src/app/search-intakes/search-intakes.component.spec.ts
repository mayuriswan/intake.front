import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchIntakesComponent } from './search-intakes.component';

describe('SearchIntakesComponent', () => {
  let component: SearchIntakesComponent;
  let fixture: ComponentFixture<SearchIntakesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchIntakesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchIntakesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
