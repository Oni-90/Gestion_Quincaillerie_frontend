import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.API_BASE_URL; //call api base url
  private accessTokenKey = "token"
  private refreshTokenKey = "refresh_token"

  /**
   *  Creates an instance of AuthService.
   * @param {HttpClient} http 
   * @memberof AuthService
   */
  constructor( private http: HttpClient) { }

  /**
   * --------------------------------------
   * methode for user login
   * --------------------------------------
   * @param {{email:string, password:string}} credentials 
   * @return {Observable<any>} 
   * @memberof AuthService
   */
  login(credentials:{email:string, password:string}): Observable<any> {
    return this.http.post<{token:string}>(`${this.baseUrl}/login`,credentials).pipe(
      tap((response) => {
        this.storeTokens(response.token);
      }),
      catchError((error) => {
        return throwError(error); //retrun error if logged in fail
      }),
    );
  }

  /**
   * --------------------------
   * logout method
   * --------------------------
   * @memberof AuthService
   */
  logout(): Observable<void> {
    const headers = this.getAuthHeaders(); //call getAuthHeaders method

    return this.http.post<void>(`${this.baseUrl}/auth/logout`, {headers}).pipe(
      tap((response) => {
        localStorage.removeItem(this.accessTokenKey);
      }),
      catchError((error) => {
        return throwError(error); //return error if loggin out fail
      })
      
    )
  }

  /**
   * ------------------------------------
   * verify that the user a logged in
   * ------------------------------------
   * @return {boolean} 
   * @memberof AuthService
   */
  isAuthenticated():boolean {
    return !!this.getAccessToken();
  }

   /**
   * ---------------------------
   * store access token 
   * ---------------------------
   * @param access_token 
   */
   private storeAccesToken(access_token:string): void {
    localStorage.setItem(this.accessTokenKey, access_token);
  }

  /**
   * ----------------------------------------------------
   * private function to store both accessToken and  
   * refresh token in local storage
   * ----------------------------------------------------
   * @param access_token 
   * @param refresh_token 
   */
  private storeTokens(access_token:string): void {
    this.storeAccesToken(access_token);
  }

  /**
   * --------------------------------------------------
   *  private function for retrieving access token
   * --------------------------------------------------
   * @returns 
   */
  getAccessToken(): string|null {
    return localStorage.getItem(this.accessTokenKey);
  }

  /**
   * ----------------------------------------------------------
   * method for retrieving token to pass in requests headers
   * ----------------------------------------------------------
   * @returns 
   */
  getAuthHeaders(): HttpHeaders{
    const token = this.getAccessToken();
    
    //if token exist create new header, else throw error
    if(token){
      return new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
    }
    else{
      throw new Error ("Token non disponible");
    }
  }
}
