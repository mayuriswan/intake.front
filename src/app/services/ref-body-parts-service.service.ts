import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefBodyPartsService {

  private apiUrl = environment.apiUrl + '/refbodyparts/active';
  // Update this URL to match your API endpoint

  constructor(private http: HttpClient) { }

  getActiveBodyParts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}