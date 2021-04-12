import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http:HttpClient) { }

  LoginUser(user:any)
  {
    return this.http.post<any>("http://localhost:5000/login", {'user': user});
  }

  LoggedIn()
  {
    return !!localStorage.getItem('token');
  }

  GetToken()
  {
    return localStorage.getItem('token');
  }

  GetName()
  {
    return JSON.parse(localStorage.getItem('user'));
  }
}
