import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap, of } from 'rxjs';
import { AuthResponse } from '../interfaces/AuthResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = "http://51.38.51.187:5050/api/v1";
  private _isAuth!: boolean;

  get auth(): boolean | undefined {
    return this._isAuth;
  }

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    // se realiza la llamada http
    return this.http.post<AuthResponse>(`${this.baseUrl}/auth/log-in`, { email, password })
      .pipe(
        tap(response => {
          if (response.accessToken) {
            // si se recibe un token lo guardamos en el localStorage
            localStorage.setItem("token", response.accessToken);
            this._isAuth = true;
          }
        }),
        map(resp => resp),
        catchError(error => of(error.error))
      )
  };

  signup(name: string, surname: string, email: string, password: string) {  
    // se registra un nuevo usuario  
    return this.http.post<AuthResponse>(`${this.baseUrl}/auth/sign-up`,
      { name, surname, email, password });          
  };

  logout() {
    // se saca al usuario actual de la sesión
    localStorage.removeItem("token");    
    this._isAuth = false;
  }
};

