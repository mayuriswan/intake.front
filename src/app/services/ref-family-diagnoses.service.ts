import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RefFamilyDiagnoses } from 'app/interfaces/ref-family-diagnoses';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefFamilyDiagnosesService {

  private apiUrl = environment.apiUrl + '/RefFamilyDiagnoses/active';

  constructor(private http: HttpClient) {}

  getActiveFamilyDiagnoses(): Observable<RefFamilyDiagnoses[]> {
    return this.http.get<RefFamilyDiagnoses[]>(this.apiUrl);
  }
}
