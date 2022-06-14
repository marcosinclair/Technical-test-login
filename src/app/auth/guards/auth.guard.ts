import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    // solo dejará cargar si el usuario está logueado
    if (localStorage.getItem("token")) 
    {          
      return true;
    }
    // LLeva a la página 404 si no está logueado
     this.router.navigateByUrl("/**");
    return false;
  }  
}
