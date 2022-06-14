import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

  constructor(private router: Router, private auth: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = localStorage.getItem('token')!;// obtenemos el token

    let request = req;

    if (token) {
      request = req.clone({
        // se establece la cabecera
        setHeaders: {
          authorization: `Bearer ${ token }`
        }
      });      
    }

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        // control de errores de las peticiones        
        if (!err.ok) {  
          if (err.status === 401) {
            // En el caso de dar un error de autorización hacemos logout y se devuelve a la pantalla de Login
            this.auth.logout();
            this.router.navigateByUrl("/login");
          }else{
            alert(err.error.message);                   
          }                     
        }
        return throwError(err);
      }) 
      );
  }
}
