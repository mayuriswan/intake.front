import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RefSugConditions } from 'app/interfaces/ref-sug-conditions';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefSugConditionsServiceService {

  private apiUrl = environment.apiUrl + '/RefSugConditions/active';


  constructor(private http: HttpClient) {}

  getActiveSugConditions(): Observable<RefSugConditions[]> {
    return this.http.get<RefSugConditions[]>(this.apiUrl);
  }
}
