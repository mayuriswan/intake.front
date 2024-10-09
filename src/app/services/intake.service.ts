  import { Injectable } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { MedicalIntake } from 'app/interfaces/medical-intake';

  @Injectable({
    providedIn: 'root'
  })
  export class IntakeService {
    private baseUrl = environment.apiUrl+'/intakes'; // Adjust based on your API path

    constructor(private http: HttpClient) {}

    searchIntakes(query: string): Observable<any[]> {
      return this.http.get<any[]>(`${this.baseUrl}/search`, {
        params: { query }
      });
    }
    getIntakeByReference(referenceNumber: string): Observable<MedicalIntake> {
      return this.http.get<MedicalIntake>(`${this.baseUrl}/intake/${referenceNumber}`);
    }
  }
