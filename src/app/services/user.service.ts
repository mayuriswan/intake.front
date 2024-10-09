import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = environment.apiUrl+'/users'; // Adjust based on your API path

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl+"/all-users");
  }

  addUser(user: any): Observable<any> {
    return this.http.post<any>(this.baseUrl+"/add-user", user);
  }

  removeUser(userId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/remove-user/${userId}`);
  }   
}
