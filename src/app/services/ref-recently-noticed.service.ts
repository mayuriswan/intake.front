import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RefRecentlyNoticed } from 'app/interfaces/ref-recently-noticed';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefRecentlyNoticedService {
  private apiUrl = environment.apiUrl + '/refRecentlyNoticed';

  constructor(private http: HttpClient) {}

  getActiveFields(): Observable<RefRecentlyNoticed[]> {
    return this.http.get<RefRecentlyNoticed[]>(`${this.apiUrl}`);
  }
}