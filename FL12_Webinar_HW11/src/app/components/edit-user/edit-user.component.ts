import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {HttpService} from '../../http.service';
import {ActivatedRoute}  from '@angular/router';
import {Router} from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  constructor(private fb: FormBuilder,private _http: HttpService, private _activatedRoute: ActivatedRoute, private _router: Router) { }
  editForm: FormGroup;
  currentUser;
  id = this._activatedRoute.snapshot.params.id;

  ngOnInit(): void {
    this.editForm = this.fb.group({
      name: [,[Validators.required, Validators.pattern('([A-Za-z0-9\. -]+)')]],
      email: [, [Validators.required, Validators.email]],
      phone: [,[Validators.required]],
      address: [],
      website: []
    })
    this._http.getUserById(this.id).subscribe(data => {
      this.currentUser =  data;
      this.changeInputs(this.currentUser);
    });
  }
  get name(){
    return this.editForm.get('name');
  }
  get email(){
    return this.editForm.get('email');
  }
  get phone(){
    return this.editForm.get('phone');
  }
  get address(){
    return this.editForm.get('address');
  }
  get website(){
    return this.editForm.get('website');
  }
  saveEditedUser():void {
    const user = {
      id: this.id,
      ...this.editForm.value
    }
    this._http.saveEditedUser(user).subscribe();
    this._router.navigate(['']);
  }
  changeInputs(userObj = {name:'', email:'', phone:'', address: '', website: ''}):void {
    const location = userObj.address.city ? userObj.address.city : userObj.address;
    this.name.setValue(userObj.name);
    this.email.setValue(userObj.email);
    this.phone.setValue(userObj.phone);
    this.address.setValue(location);
    this.website.setValue(userObj.website);
  }
  
}
