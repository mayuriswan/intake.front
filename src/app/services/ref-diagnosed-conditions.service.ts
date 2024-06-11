import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RefDiagnosedConditions } from 'app/interfaces/ref-diagnosed-conditions';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefDiagnosedConditionsService {
  private apiUrl = environment.apiUrl + '/refdiagnosedconditions';


  constructor(private http: HttpClient) {}

  getActiveDiagnosedConditions(): Observable<RefDiagnosedConditions[]> {
    return this.http.get<RefDiagnosedConditions[]>(`${this.apiUrl}/active`);
  }
}
