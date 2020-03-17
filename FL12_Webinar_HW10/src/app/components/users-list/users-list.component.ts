import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {User} from '../../interfaces/user';
import {usersArray} from './data';
 
@Component({
  selector: 'users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})

export class UsersListComponent implements OnInit{
  constructor(private fb: FormBuilder) {}
  myForm: FormGroup;
  searchedName: string;
  closed = true;
  nextId: number;
  usersList: User[];

  ngOnInit(): void {
    this.myForm = this.fb.group({
      name: ['',[Validators.required, Validators.pattern('([A-Za-z0-9\. -]+)')]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['',[Validators.required]],
    })
    this.usersList = usersArray;
    this.nextId = 5;
  }

  get name(){
    return this.myForm.get('name');
  }
  get email(){
    return this.myForm.get('email');
  }
  get phone(){
    return this.myForm.get('phone');
  }

  toggleTheForm():void {
    this.closed = !this.closed;
    if(this.closed) this.clearInputs();
  }
  saveUser():void {
      const newUser:User = {
        id: this.nextId,
        ...this.myForm.value,
      } 
      this.usersList.push(newUser);
      this.nextId++;
    this.toggleTheForm();
  }
  deleteUser(id:number):void {
    this.usersList = this.usersList.filter( user => user.id !== id)
  }
  saveEditedUser(newUserData: User):void {
      const index: number = this.usersList.findIndex( user => user.id === newUserData.id);
      this.usersList.splice(index,1,newUserData);
  }
  clearInputs():void {
    this.name.setValue('');
    this.email.setValue('');
    this.phone.setValue('');
  }
}
