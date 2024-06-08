import { MedBodyPart } from "./med-body-part";
import { MedConditions } from "./med-conditions";
import { SugConditions } from "./sug-conditions";

export interface MedicalIntake {
    id: number;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    referenceNumber: string | null;
    middleName: string | null;
    maritalStatus: string | null;
    idType: string | null;
    idNumber: string | null;
    dateOfBirth: Date | null;
    gender: string | null;
    address1: string | null;
    address2: string | null;
    address3: string | null;
    country: string | null;
    cellNumber: string | null;
    homeNumber: string | null;
    workNumber: string | null;
      // Fields for step 2
  workRestriction: string | null;
  medicalLegalCase: string | null;
  latexSensitive: string | null;
  smoke: string | null;
  implantedDevice: string | null;
  implantedDeviceDetails: string | null;
  pregnant: string | null;
  allergies: string | null;

        // New property for step 3
  recentlyNoted : string | null;
  bodyParts: MedBodyPart[];

  //step5
  symptomStartDate: Date | null;
  symptomStartEst: string | null;
  symptomCause: string | null;
  symptomStatus: string | null;
  physicalActivity: string | null;
  treatmentReceived: string | null;
  specialTests: string | null;
  hadProblemBefore: boolean | null;
  problemBeforeWhen: string | null;
  treatmentBefore: string | null;

    // Step 6
    aggravatingFactors: string | null;
    easingFactors: string | null;
    sleepIssues: string | null;
    WorstSymptoms: string | null;
    BestSymptoms: string | null;
    currentPainLevel: number | null;
    bestPainLevel: number | null;
    worstPainLevel: number | null;
    // New property for step 7
    steroidMedications: boolean | null;
    bloodThinningMedications: boolean | null;
    medConditions: MedConditions[];
    sugConditions: SugConditions[];

  }
  