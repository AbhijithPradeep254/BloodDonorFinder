import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestsService } from '../requests.service';
import { UsersService } from '../users.service';
import { ReqModel } from './req.model';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {

  constructor(private reqService: RequestsService, private userService: UsersService, private router: Router) { }

  title: String = "Requests";
  requests: ReqModel[];
  reqTemp: Object[];

  ngOnInit(): void {
    this.reqService.getReqs().subscribe(data =>
      {
        this.requests = JSON.parse(JSON.stringify(data));
        this.reqTemp = this.requests;
      });
  }

  filterValues = 
  {
    city: '',
    state: '',
  };

  filterData()
  {
    this.reqTemp = this.userService.filterFunc(this.requests,this.filterValues);
  }

  newRequest(event:any)
  {
    event.preventDefault();
    this.reqService.setter(new ReqModel());
    this.router.navigate(['/account/post']);
  }



}
