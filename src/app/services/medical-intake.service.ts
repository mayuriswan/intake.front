import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MedicalIntake } from 'app/interfaces/medical-intake';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicalIntakeService {

  private apiUrl = environment.apiUrl + '/medicalintakes';

  constructor(private http: HttpClient) { }

  createMedicalIntake(intake: MedicalIntake): Observable<{ referenceNumber: string }> {
    return this.http.post<{ referenceNumber: string }>(this.apiUrl, intake);
  }

  getMedicalIntakeByReference(referenceNumber: string): Observable<MedicalIntake> {
    console.log(this.apiUrl);
    return this.http.get<MedicalIntake>(`${this.apiUrl}/${referenceNumber}`);
  }

  updateMedicalIntake(intake: MedicalIntake): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${intake.id}`, intake);
  }
}