import { Component, OnInit } from '@angular/core';
import {User} from '../../interfaces/user';
import {HttpService} from '../../http.service';

@Component({
  selector: 'users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})

export class UsersListComponent implements OnInit{
  constructor(private _http: HttpService) {}
  searchedName: string;
  usersList: User[];

  ngOnInit(): void {
    this._http.getUsers().subscribe(data => {
      this.usersList =  data;
    });
  }
  deleteUser(id:number):void {
    this._http.deleteUser(id).subscribe();
    this._http.getUsers().subscribe(data => {
      this.usersList =  data;
    });
  }
}

