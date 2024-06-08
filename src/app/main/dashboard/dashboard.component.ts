import { Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Stepper from 'bs-stepper';
import { ActivatedRoute } from '@angular/router';
import { MedicalIntakeService } from 'app/services/medical-intake.service';
import { RefRecentlyNoticedService } from 'app/services/ref-recently-noticed.service'; // Import the service
import { MedicalIntake } from 'app/interfaces/medical-intake';
import { RefRecentlyNoticed } from 'app/interfaces/ref-recently-noticed'; // Import the interface
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { MedBodyPart } from 'app/interfaces/med-body-part';
import { RefBodyPart } from 'app/interfaces/ref-body-part';
import { RefBodyPartsService } from 'app/services/ref-body-parts-service.service';
import { RefMedConditionsServiceService } from 'app/services/ref-med-conditions-service.service';
import { RefSugConditionsServiceService } from 'app/services/ref-sug-conditions-service.service';
import { RefMedConditions } from 'app/interfaces/ref-med-conditions';
import { RefSugConditions } from 'app/interfaces/ref-sug-conditions';
import { MedConditions } from 'app/interfaces/med-conditions';
import { SugConditions } from 'app/interfaces/sug-conditions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '(keyup.ctrl.k)': 'clear()'
  }
})
export class DashboardComponent implements OnInit {
  @ViewChild("canvas", { static: true }) canvas: ElementRef;

  private modernWizardStepper: Stepper;

  selected_all = true;
  issues: MedBodyPart[] = [{
    id: 0,
    intakeReference: "",
    bodyPart: "",
    issue: ''
  }];

  medications: MedConditions[] = [{
    id: 0,
    intakeReference: "",
    name: ''
  }];
  conditions: SugConditions[] = [{
    id: 0,
    intakeReference: "",
    name: ''
  }];

  intake: MedicalIntake;
  activeFields: RefRecentlyNoticed[] = [];
  activeBodyParts: RefBodyPart[] = [];
  activeMedConditions: RefMedConditions[] = [];
  activeSugConditions: RefSugConditions[] = [];

  intakeFormStep1: FormGroup;
  intakeFormStep2: FormGroup;
  intakeFormStep3: FormGroup;
  intakeFormStep4: FormGroup;
  intakeFormStep5: FormGroup;
  intakeFormStep6: FormGroup;
  intakeFormStep7: FormGroup;

  currentStep: number = 0;

  constructor(
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private medicalIntakeService: MedicalIntakeService,
    private refRecentlyNoticedService: RefRecentlyNoticedService,
    private refBodyPartsService: RefBodyPartsService,
    private refMedConditionsService: RefMedConditionsServiceService,
    private refSugConditionsService: RefSugConditionsServiceService,
    public changeevent: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.modernWizardStepper = new Stepper(document.querySelector('#stepper3'), {
      linear: false,
      animation: true
    });

    this.initializeForms();

    this.loadActiveFields();
    this.loadActiveBodyParts();
    this.loadActiveMedConditions();
    this.loadActiveSugConditions();

    this.route.paramMap.subscribe(params => {
      const referenceNumber = params.get('referenceNumber');
      if (referenceNumber) {
        this.fetchMedicalIntake(referenceNumber);
      } else {
        console.error('No reference number found in route parameters');
      }
    });
  }

  initializeForms() {
    this.intakeFormStep1 = this.fb.group({
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      maritalStatus: [''],
      idType: [''],
      idNumber: [''],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
      address1: ['', Validators.required],
      address2: [''],
      address3: [''],
      country: ['', Validators.required],
      cellNumber: [''],
      homeNumber: [''],
      workNumber: [''],
      email: [{ value: '', disabled: true }]
    });

    this.intakeFormStep2 = this.fb.group({
      workRestriction: ['', Validators.required],
      medicalLegalCase: ['', Validators.required],
      latexSensitive: ['', Validators.required],
      smoke: ['', Validators.required],
      implantedDevice: ['', Validators.required],
      implantedDeviceDetails: [''],
      pregnant: [''],
      allergies: ['']
    });

    this.intakeFormStep3 = this.fb.group({});

    this.intakeFormStep4 = this.fb.group({
      issues: this.fb.array([])
    });

    this.intakeFormStep5 = this.fb.group({
      symptomStartDate: [''],
      symptomStartEst: [''],
      symptomCause: [''],
      symptomStatus: [''],
      physicalActivity: [''],
      treatmentReceived: [''],
      specialTests: [''],
      hadProblemBefore: [''],
      problemBeforeWhen: [''],
      treatmentBefore: ['']
    });

    this.intakeFormStep6 = this.fb.group({
      aggravatingFactors: [''],
      easingFactors: [''],
      sleep1: [false],
      sleep2: [false],
      sleep3: [false],
      sleep4: [false],
      worst1: [false],
      worst2: [false],
      worst3: [false],
      worst4: [false],
      worst5: [false],
      best1: [false],
      best2: [false],
      best3: [false],
      best4: [false],
      best5: [false],
      currentPainLevel: [''],
      bestPainLevel: [''],
      worstPainLevel: ['']
    });

    this.intakeFormStep7 = this.fb.group({
      steroidMedications: [''],
      bloodThinningMedications: [''],
    
    });
  }

  loadActiveFields() {
    this.refRecentlyNoticedService.getActiveFields().subscribe(fields => {
      this.activeFields = fields;
      this.activeFields.forEach(field => {
        this.intakeFormStep3.addControl('field' + field.id, new FormControl(false));
      });
    });
  }

  loadActiveBodyParts() {
    this.refBodyPartsService.getActiveBodyParts().subscribe(bodyParts => {
      this.activeBodyParts = bodyParts;
    });
  }

  loadActiveMedConditions() {
    this.refMedConditionsService.getActiveMedConditions().subscribe(conditions => {
      this.activeMedConditions = conditions;
    });
  }

  loadActiveSugConditions() {
    this.refSugConditionsService.getActiveSugConditions().subscribe(conditions => {
      this.activeSugConditions = conditions;
    });
  }

  fetchMedicalIntake(referenceNumber: string): void {
    this.medicalIntakeService.getMedicalIntakeByReference(referenceNumber)
      .subscribe(data => {
        this.intakeFormStep1.patchValue({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email
        });
        this.intake = data;
        this.changeevent.detectChanges();
      }, error => {
        console.error('Error fetching medical intake:', error);
      });
  }

  modernHorizontalNext() {
    if (this.currentStep === 0 && this.intakeFormStep1.valid) {
      this.updateIntakeFromStep1();
    } else if (this.currentStep === 1 && this.intakeFormStep2.valid) {
      this.updateIntakeFromStep2();
    } else if (this.currentStep === 2 && this.intakeFormStep3.valid) {
      this.updateIntakeFromStep3();
    } else if (this.currentStep === 3 && this.issues.length > 0) {
      this.updateIntakeFromStep4();
    } else if (this.currentStep === 4 && this.intakeFormStep5.valid) {
      this.updateIntakeFromStep5();
    } else if (this.currentStep === 5 && this.intakeFormStep6.valid) {
      this.updateIntakeFromStep6();
    } else if (this.currentStep === 6 && this.intakeFormStep7.valid) {
      this.updateIntakeFromStep7();
    } else {
      console.error('Form is invalid');
    }
  }

  modernHorizontalPrevious() {
    this.modernWizardStepper.previous();
    this.currentStep--;
  }

  updateIntakeFromStep1() {
    this.intake.firstName = this.intakeFormStep1.get('firstName')?.value;
    this.intake.middleName = this.intakeFormStep1.get('middleName')?.value;
    this.intake.lastName = this.intakeFormStep1.get('lastName')?.value;
    this.intake.maritalStatus = this.intakeFormStep1.get('maritalStatus')?.value;
    this.intake.idType = this.intakeFormStep1.get('idType')?.value;
    this.intake.idNumber = this.intakeFormStep1.get('idNumber')?.value;
    this.intake.dateOfBirth = this.intakeFormStep1.get('dateOfBirth')?.value;
    this.intake.gender = this.intakeFormStep1.get('gender')?.value;
    this.intake.address1 = this.intakeFormStep1.get('address1')?.value;
    this.intake.address2 = this.intakeFormStep1.get('address2')?.value;
    this.intake.address3 = this.intakeFormStep1.get('address3')?.value;
    this.intake.country = this.intakeFormStep1.get('country')?.value;
    this.intake.cellNumber = this.intakeFormStep1.get('cellNumber')?.value;
    this.intake.homeNumber = this.intakeFormStep1.get('homeNumber')?.value;
    this.intake.workNumber = this.intakeFormStep1.get('workNumber')?.value;

    this.saveIntake();
  }

  updateIntakeFromStep2() {
    this.intake.workRestriction = this.intakeFormStep2.get('workRestriction')?.value;
    this.intake.medicalLegalCase = this.intakeFormStep2.get('medicalLegalCase')?.value;
    this.intake.latexSensitive = this.intakeFormStep2.get('latexSensitive')?.value;
    this.intake.smoke = this.intakeFormStep2.get('smoke')?.value;
    this.intake.implantedDevice = this.intakeFormStep2.get('implantedDevice')?.value;
    this.intake.implantedDeviceDetails = this.intakeFormStep2.get('implantedDeviceDetails')?.value;
    this.intake.pregnant = this.intakeFormStep2.get('pregnant')?.value;
    this.intake.allergies = this.intakeFormStep2.get('allergies')?.value;

    this.saveIntake();
  }

  updateIntakeFromStep3() {
    const selectedFields = this.activeFields
      .filter(field => this.intakeFormStep3.get('field' + field.id)?.value)
      .map(field => field.name)
      .join(', ');

    this.intake.recentlyNoted = selectedFields;

    this.saveIntake();
  }

  updateIntakeFromStep4() {
    this.intake.bodyParts = this.issues;
    this.saveIntake();
  }

  updateIntakeFromStep5() {
    this.intake.symptomStartDate = this.intakeFormStep5.get('symptomStartDate')?.value;
    this.intake.symptomStartEst = this.intakeFormStep5.get('symptomStartEst')?.value;
    this.intake.symptomCause = this.intakeFormStep5.get('symptomCause')?.value;
    this.intake.symptomStatus = this.intakeFormStep5.get('symptomStatus')?.value;
    this.intake.physicalActivity = this.intakeFormStep5.get('physicalActivity')?.value;
    this.intake.treatmentReceived = this.intakeFormStep5.get('treatmentReceived')?.value;
    this.intake.specialTests = this.intakeFormStep5.get('specialTests')?.value;
    this.intake.hadProblemBefore = this.intakeFormStep5.get('hadProblemBefore')?.value.toString() === 'true' ? true : false;
    this.intake.problemBeforeWhen = this.intakeFormStep5.get('problemBeforeWhen')?.value;
    this.intake.treatmentBefore = this.intakeFormStep5.get('treatmentBefore')?.value;

    this.saveIntake();
  }

  updateIntakeFromStep6() {
    this.intake.aggravatingFactors = this.intakeFormStep6.get('aggravatingFactors')?.value;
    this.intake.easingFactors = this.intakeFormStep6.get('easingFactors')?.value;

    const sleepIssueMap = {
      sleep1: 'Sleep only with medication',
      sleep2: 'Difficulty falling asleep',
      sleep3: 'No problem sleeping',
      sleep4: 'Awakened by pain'
    };
    const worstSymptomsMap = {
      worst1: 'Morning',
      worst2: 'Afternoon',
      worst3: 'Evening',
      worst4: 'Night',
      worst5: 'After Exercise'
    };
    const bestSymptomsMap = {
      best1: 'Morning',
      best2: 'Afternoon',
      best3: 'Evening',
      best4: 'Night',
      best5: 'After Exercise'
    };

    const sleepIssues = Object.keys(sleepIssueMap)
      .filter(sleep => this.intakeFormStep6.get(sleep)?.value)
      .map(sleep => sleepIssueMap[sleep])
      .join(', ');
    this.intake.sleepIssues = sleepIssues;

    const worstSymptoms = Object.keys(worstSymptomsMap)
      .filter(worst => this.intakeFormStep6.get(worst)?.value)
      .map(worst => worstSymptomsMap[worst])
      .join(', ');
    this.intake.WorstSymptoms = worstSymptoms;

    const bestSymptoms = Object.keys(bestSymptomsMap)
      .filter(best => this.intakeFormStep6.get(best)?.value)
      .map(best => bestSymptomsMap[best])
      .join(', ');
    this.intake.BestSymptoms = bestSymptoms;

    this.intake.currentPainLevel = this.intakeFormStep6.get('currentPainLevel')?.value;
    this.intake.bestPainLevel = this.intakeFormStep6.get('bestPainLevel')?.value;
    this.intake.worstPainLevel = this.intakeFormStep6.get('worstPainLevel')?.value;

    this.saveIntake();
  }

  updateIntakeFromStep7() {
    this.intake.steroidMedications = this.intakeFormStep7.get('steroidMedications')?.value.toString() === '1' ? true : false;
    this.intake.bloodThinningMedications = this.intakeFormStep7.get('bloodThinningMedications')?.value.toString() === '1' ? true : false;
    this.intake.medConditions = this.medications;
    this.intake.sugConditions = this.conditions;
    console.log(this.intake);
    this.saveIntake();
  }

  saveIntake() {
    this.medicalIntakeService.updateMedicalIntake(this.intake)
      .subscribe(() => {
        console.log('Medical intake updated successfully');
        this.modernWizardStepper.next();
        this.currentStep++;
      }, error => {
        console.error('Error updating medical intake:', error);
      });
  }

  onadd_issue() {
    this.issues.push({
      id: 0,
      intakeReference: this.intake.referenceNumber || "",
      bodyPart: "",
      issue: ''
    });
  }
  onadd_medication() {
    //make it like onadd_issue
    this.medications.push({
      id: 0,
      intakeReference: this.intake.referenceNumber || "",
      name: ''
    });
}

onadd_condition() {
  //make it like onadd_issue
  this.conditions.push({
    id: 0,
    intakeReference: this.intake.referenceNumber || "",
    //this name should be comming from the form 
    name: ''
  });
}
  removeMedication(index: number) {
    this.medications.splice(index, 1);
  }

 

  removeCondition(index: number) {
    this.conditions.splice(index, 1);
  }

  range(start: number, end: number): number[] {
    return Array.from({ length: end - start + 1 }, (_, i) => i + start);
  }

  onSubmit() {
    // Submit logic
  }
}
