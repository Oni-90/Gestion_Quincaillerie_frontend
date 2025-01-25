import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Client } from '../../models/client/client';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private baseUrl = environment.API_BASE_URL;

  constructor(private http:HttpClient, private authService:AuthService) { }

  registerClient(client:Client): Observable<Client> {
    const headers = this.authService.getAuthHeaders(); //call getAuthHeaders method

    return this.http.post<Client>(`${this.baseUrl}/auth/clients`, client, {headers}).pipe(
      catchError((error) => {
        return throwError(error); //return error if fail
      }),
    );
  }

  getAllClients(): Observable<Client[]> {
    const headers = this.authService.getAuthHeaders(); //call getAuthHeaders method
    
    return this.http.get<Client[]>(`${this.baseUrl}/auth/clients`, {headers}).pipe(
      catchError((error) => {
        return throwError(error); //return error 
      })
    )
  }

  find(id:number): Observable<Client> {
    const headers = this.authService.getAuthHeaders(); //call getAuthHeaders method
    
    return this.http.get<Client>(`${this.baseUrl}/auth/clients/${id}`, {headers}).pipe(
      catchError((error) => {
        return throwError(error); //return error 
      })
    )
  }
}
