import { Component, OnInit } from '@angular/core';
import { IntakeService } from 'app/services/intake.service'; // Assuming you have an IntakeService

@Component({
  selector: 'app-search-intakes',
  templateUrl: './search-intakes.component.html',
  styleUrls: ['./search-intakes.component.scss']
})
export class SearchIntakesComponent implements OnInit {
  searchQuery: string = '';
  searchResults: any[] = [];

  constructor(private intakeService: IntakeService) {}

  ngOnInit(): void {}

  // Search intake forms based on query
  onSearch(): void {
    this.intakeService.searchIntakes(this.searchQuery).subscribe((results) => {
      this.searchResults = results;
    });
  }
}
