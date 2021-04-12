import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UserModel } from '../signup/user.model';
import { UsersService } from '../users.service';
import { userData } from '../../model/UserData';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor(private usersService: UsersService, private authService: AuthService) { }

  title: String = "Welcome";
  user: any = this.authService.GetName();

  ngOnInit(): void {
  }


}
