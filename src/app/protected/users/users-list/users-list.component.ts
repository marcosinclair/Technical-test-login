import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  users: User[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    // llamada para obtener la lista de usuarios
    this.userService.userList()
    .subscribe(userList => {      
      if (userList.items) {
        // se almacenan los nuevos usuarios en el array
        this.users = [...userList.items];
      }
    });
  };  
}
