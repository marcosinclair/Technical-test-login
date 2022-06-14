import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';
import { catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl: string = "http://51.38.51.187:5050/api/v1";  

  constructor(private http: HttpClient) { }
  
  userList(){
    // se realiza la llamada para obtener la lista de usuarios
    return this.http.get<User>(`${this.baseUrl}/users`, {  })
      .pipe(       
        map(resp => resp),
        catchError(error => of(error.error))
      )
  }
  
  editUser(name: string, surname: string, email: string, id: string){
    // se realiza la llamada para editar el usuario
    return this.http.put<User>(`${this.baseUrl}/users/${id}`, {name, surname, email, id })
    .pipe( 
      map(resp => resp),
      catchError(error => of(error.error))
    )
  }

  deleteUser(userId: string){
    // se realiza la llamada para eliminar el usuario
    return this.http.delete<User>(`${this.baseUrl}/users/${userId}`)
    .pipe( 
      map(resp => resp),
      catchError(error => of(error.error))
    )
  } 
}
