import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {User} from '../../interfaces/user';
import {HttpService} from '../../http.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  constructor(private fb: FormBuilder,private _http: HttpService, private _router: Router) { }
  myForm: FormGroup;
  ngOnInit(): void {
  this.myForm = this.fb.group({
    name: ['',[Validators.required, Validators.pattern('([A-Za-z0-9\. -]+)')]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['',[Validators.required]],
    address: [''],
    website: ['']
  })
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
  get address(){
    return this.myForm.get('address');
  }
  get website(){
    return this.myForm.get('website');
  }
  clearInputs():void {
    this.name.setValue('');
    this.email.setValue('');
    this.phone.setValue('');
    this.address.setValue('');
    this.website.setValue('');
  }
  saveUser():void {
    this._http.saveUser(this.myForm.value).subscribe();
    this._router.navigate(['']);
  }
}
