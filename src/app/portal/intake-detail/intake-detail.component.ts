import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IntakeService } from 'app/services/intake.service';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-intake-detail',
  templateUrl: './intake-detail.component.html'
})
export class IntakeDetailComponent implements OnInit {
  medConditionNames: string = '';
  sugConditionNames: string = '';

  intake: any; // Assuming you have your intake object

  constructor(private route: ActivatedRoute, private intakeService: IntakeService) {}
  exportToExcel() {
    // Convert the intake data to a JSON string
    const intakeData = JSON.stringify(this.intake, null, 2);

    // Create a new workbook and worksheet
    const worksheet = XLSX.utils.json_to_sheet([{ intakeData }], { skipHeader: true });
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Intake Data');

    // Export the workbook to Excel
    XLSX.writeFile(workbook, 'intake-details.xlsx');
  }
  ngOnInit(): void {
    const referenceNumber = this.route.snapshot.paramMap.get('referenceNumber');
    this.intakeService.getIntakeByReference(referenceNumber).subscribe((data) => {
      this.intake = data;
    });
    if (this.intake) {
      // Process the medical conditions to extract names
      if (this.intake.medConditions && this.intake.medConditions.$values) {
        this.medConditionNames = this.intake.medConditions.$values
          .map((cond: any) => cond.name)
          .join(', ');
      }

      // Process the surgical conditions to extract names
      if (this.intake.sugConditions && this.intake.sugConditions.$values) {
        this.sugConditionNames = this.intake.sugConditions.$values
          .map((cond: any) => cond.name)
          .join(', ');
      }
    }
  }
}
