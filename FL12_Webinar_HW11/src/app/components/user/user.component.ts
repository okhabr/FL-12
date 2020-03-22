import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import {Router} from '@angular/router';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  @Input() user: User;
  @Output() deleteUser = new EventEmitter();
  constructor(private _router: Router) { }
 
  ngOnInit(): void {}

  deleted(id: number):void {
    this.deleteUser.emit(id);
  }
  edit():void {
    this._router.navigate(['users',this.user.id]);
  }
}
