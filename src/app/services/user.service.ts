import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from '../_models/user';



@Injectable()
export class UserService {
  private selectedUser: User[];
  private id: any;
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<User[]>(`/users`);
  }

  getById(id: number) {
    return this.http.get(`/users/` + id);
  }

  register(user: User) {
    return this.http.post(`/users/register`, user);
  }

  update(user: User, id: any) {
    console.log(user);
    return this.http.put<User[]>(`/users/` + id + '/update', user);
  }

  delete(id: number) {
    return this.http.delete(`/users/` + id);
  }

  getSelectedUser(): User[] {
    return this.selectedUser;
  }

  setSelectedUser(selectedUser: User[]) {
    this.selectedUser = selectedUser;
  }
}
