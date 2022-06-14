import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  name: string = "";
  surname: string = "";
  email: string = "";
  password: string = "";

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {

  }

  signup() {
    if (this.name && this.surname && this.email && this.password) {
      // Se registra al usuario
      this.auth.signup(this.name, this.surname, this.email, this.password)
        .subscribe(ok => {
          alert("User successfully registered. Please, Login")
          this.router.navigateByUrl("/login")
        })
    } else {
      // control de campos del formulario
      alert("You must fill in all fields of the form!");
    }
  }
}
