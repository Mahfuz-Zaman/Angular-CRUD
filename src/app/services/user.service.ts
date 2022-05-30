import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../interfaces/user.interface';
import { Observable } from 'rxjs';

// const API_USER = environment.apiBaseLink;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getAllUsers() {
    return this.http.get<{ success: boolean; message: string; data: User[] }>(
      'http://localhost:3000/get-all-users'
    );
  }

  getSingleUser(id:string) {
    return this.http.get<{ success: boolean; message: string; data: User }>(
      'http://localhost:3000/single-user/' + id
    );
  }

  addUser(data: User) {
    return this.http.post<{ success: boolean; message: string; data: User }>(
      'http://localhost:3000/add-user',
      data
    );
  }

  editUser(data:User){
    return this.http.put<any>('http://localhost:3000/edit-user', data);
  }

  deleteUser(id: string) {
    return this.http
      .delete<any>('http://localhost:3000/delete-user/' + id)
      .subscribe((data) => {
        console.log(data.msg);
      });
  }
}
