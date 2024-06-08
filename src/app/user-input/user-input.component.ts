import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MedicalIntake } from 'app/interfaces/medical-intake';
import { MedicalIntakeService } from 'app/services/medical-intake.service';

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.scss']
})
export class UserInputComponent implements OnInit {
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private medicalIntakeService: MedicalIntakeService
  ) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    console.log("hello");
    if (this.userForm.valid) {
      
      const intake: MedicalIntake = {
        id:0,
        firstName: this.userForm.value.firstName,
        lastName: this.userForm.value.lastName,
        email: this.userForm.value.email,
        referenceNumber: null,
        middleName: null,
        maritalStatus: null,
        idType: null,
        idNumber: null,
        dateOfBirth: null,
        gender: null,
        address1: null,
        address2: null,
        address3: null,
        country: null,
        cellNumber: null,
        homeNumber: null,
        workNumber: null,
        workRestriction:null,
        medicalLegalCase:null,
        latexSensitive:null, 
        smoke:null,
        implantedDevice:null,
        implantedDeviceDetails:null,
        pregnant:null,
        allergies:null,
        recentlyNoted:null,
        bodyParts: [],
        symptomStartDate: null,
        symptomStartEst: null,
        symptomCause: null,

        symptomStatus: null,
        physicalActivity: null,
        treatmentReceived: null,
        specialTests: null,
        hadProblemBefore: null,
        problemBeforeWhen: null,
        treatmentBefore: null,

        //step 6
        aggravatingFactors: null,
        easingFactors: null,
        sleepIssues: null,
        WorstSymptoms: null,
        BestSymptoms: null,
        currentPainLevel: null,
        bestPainLevel: null,
        worstPainLevel: null,
        //step 7
        steroidMedications: null,
        bloodThinningMedications: null,
        medConditions: [],
        sugConditions: []

        
      };

      this.medicalIntakeService.createMedicalIntake(intake)
      .subscribe(response => {
        const referenceNumber = response.referenceNumber;
        console.log("Received reference number:", referenceNumber);
        this.router.navigate(['/dashboard', referenceNumber]);
      }, error => {
        console.error('Error creating medical intake:', error);
      });
  
    }
  }
}