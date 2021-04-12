import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from './user.model';
import { UsersService } from '../users.service';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  constructor(private usersService: UsersService, private router: Router) 
  {}

  title: String = "Register as a new Donor here";
  userItem = new UserModel(null,null,null,null,null,null,null,null);
  
  ngOnInit(): void {
  }
  
  AddUser()
  {
    if (this.userItem.password == this.userItem.confPassword)
    {
      const salt = bcrypt.genSaltSync(10);
      this.userItem.password = bcrypt.hashSync(this.userItem.password, salt);
      this.usersService.newUser(this.userItem);
      console.log(this.userItem);
      alert("success");
      this.router.navigate(['/']);
    }
    else
    {
      alert("Password confirmation does not match");
    }
  }


}
