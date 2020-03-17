import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  @Input() user: User;
  @Output() deleteUser = new EventEmitter();
  @Output() editUser = new EventEmitter();
  constructor(private fb: FormBuilder) { }
  editForm: FormGroup;
  editing: boolean;

  ngOnInit(): void {
    this.editForm = this.fb.group({
      name: ['',[Validators.required, Validators.pattern('([A-Za-z0-9\. -]+)')]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['',[Validators.required]],
    })
    this.editing = false;
  }
  get editName(){
    return this.editForm.get('name');
  }
  get editEmail(){
    return this.editForm.get('email');
  }
  get editPhone(){
    return this.editForm.get('phone');
  }

  deleted(id: number):void {
    this.deleteUser.emit(id);
  }
  edited(): void {
    const newUserData:User = {
      id: this.user.id,
      ...this.editForm.value,
    }
    this.editing = false;
    this.editUser.emit(newUserData);
  }
  edit(oldUser:User):void {
    this.editing = true;
    this.editName.setValue(this.user.name);
    this.editEmail.setValue(this.user.email);
    this.editPhone.setValue(this.user.phone);
  }
  discardChanges():void {
    this.editing = false;
  }

}
