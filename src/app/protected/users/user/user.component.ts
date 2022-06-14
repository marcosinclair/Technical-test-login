import { Component, Input, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @Input() user: User = { name: "", surname: "", email: "", id: "" };
  @Input() index: number = 0;

  constructor(private userService: UserService,
    private modalService: NgbModal,
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  details(showModal: any) {
    this.modalService.open(showModal, { centered: true });
  }

  delete(deleteModal: any) {
    this.modalService.open(deleteModal, { centered: true }).result.then((result) => {
      // Se elimina el usuario
      this.userService.deleteUser(this.user.id)
        .subscribe(resp => { });

      // refrescamos el componente           
      this.refreshComponent();
    }, (reason) => { });
  };

  edit(contentModal: any) {
    this.modalService.open(contentModal, { centered: true }).result.then((result) => {
      // Se obtienen los valores actualizados del modal
      this.user.name = (<HTMLInputElement>document.getElementById("name")).value;
      this.user.surname = (<HTMLInputElement>document.getElementById("surname")).value;
      this.user.email = (<HTMLInputElement>document.getElementById("email")).value;

      // se actualizan
      this.userService.editUser(this.user.name, this.user.surname, this.user.email, this.user.id)
        .subscribe(resp => { });
    }, (reason) => {

    });
  }

  refreshComponent() {
    setTimeout(() => {
      // refrescamos el componente   
      let currentUrl = this.router.url;
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([currentUrl]);        
      });
    }, 300);

  }
}
