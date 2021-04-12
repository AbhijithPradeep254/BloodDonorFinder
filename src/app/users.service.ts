import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) { }

  newUser(user:any)
  {
    return this.http.post('http://localhost:5000/signup',{'user' : user})
    .subscribe(data => {console.log(data)});
  }

  filterData(data:any)
  {
    return this.http.post('http://localhost:5000/finddonor',{'data' : data})
    .subscribe(dat => {console.log(dat)});
  }

  getUsers()
  {
    return this.http.get('http://localhost:5000/finddonor');
  }

  filterFunc(array: Array<any>,filter: Object)
  {
    const filterKeys = Object.keys(filter);
    return array.filter(item =>
    {
      return filterKeys.every(key =>
        {
          return filter[key].includes(item[key]);
        })
    });
  }
}; 
