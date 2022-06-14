import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = "";
  password: string = "";

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  login() {    
    if (this.email && this.password) {
      this.auth.login(this.email, this.password)
      .subscribe(resp => {  
        // Si nos ha devuelto un token nos vamos a la página del listado de usuarios      
        if (resp.accessToken) {
          this.router.navigateByUrl("users");
        }
      })
    } else {
      // control de campos del formulario
      alert("You must fill in all fields of the form!");      
    }
  }
}
