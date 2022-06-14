import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  // switch que controla si se muestran o no las opciones del menú
  isAuth!: boolean;

  // Obtiene el estado de la autenticación de usuario
  get serviceIsAuth(){
    return this.auth.auth;
  }

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {        
    // se comprueba si hay un token activo
    this.isAuth = localStorage.getItem("token") ? true : false    
  }

  logout() {    
    // se desloguea al usuario y se le lleva de vuelta a la pantalla de login
    this.isAuth = false;
    this.router.navigateByUrl("/logout");
  }
}
