import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReqModel } from './request/req.model';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  constructor(private http: HttpClient) { }

  userObj = JSON.parse(localStorage.getItem('user'));
  request: ReqModel;

  getReqs()
  {
    return this.http.get("http://localhost:5000/account/requests" || 'http://localhost:5000/account/postedreqs');
  }

  postReq(reqt:any)
  {
    return this.http.post("http://localhost:5000/account/post", {'reqt' : reqt, 'user' : this.userObj})
    .subscribe(data => console.log(data));
  }

  updateReq(reqt:any)
  {
    return this.http.put("http://localhost:5000/account/update", {'reqt' : reqt});
  }

  deleteReq(id:string)
  {
    return this.http.delete("http://localhost:5000/account/delete/"+id);
  }

  setter(request: ReqModel)
  {
    this.request = request;
  }

  getter()
  {
    return this.request;
  }

}
