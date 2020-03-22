import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from '../app/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  nextId: number = 12;
  usersList: User[] = [];
  constructor(private http: HttpClient) { }

  getUserById(id){
    return this.http.get(`http://localhost:3000/users/${id}`)
  }
  getUsers() {
    return this.http.get('http://localhost:3000/users');
  }
  getUpdated(){
    return this.usersList;
  }
  saveUser(newUserData: object) {
      const newUser:object = {
        id: this.nextId,
        ...newUserData,
      }
      this.nextId++;
      return this.http.post('http://localhost:3000/users', newUser);
  }
  saveEditedUser(editedUserData: object){
    return this.http.put(`http://localhost:3000/users/${editedUserData.id}`,editedUserData);
  }
  deleteUser(id:number){
    const url = `http://localhost:3000/users/${id}`
    return this.http.delete(url);
  }
}
