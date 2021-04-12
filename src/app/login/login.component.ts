import { Component, OnInit} from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title:String = "Login Here"
  user = {
    email:'',
    password: ''
  };

  msg:String = "";
  isValid:Boolean = false;

  constructor(private authService: AuthService, private router: Router) { }
  
  ngOnInit(): void {
  };
  

  LoginUser()
  {
    this.authService.LoginUser(this.user)
    .subscribe(res =>
      {
        if (res.isValid)
        {
          localStorage.setItem('token', res.token);
          localStorage.setItem('user', JSON.stringify(res.userDb));
          alert(res.msg);
          this.router.navigate(['account']);
        }
        else
        {
          alert(res.msg);
        }
      });
  }
}
