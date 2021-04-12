import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReqModel } from '../request/req.model';
import { RequestsService } from '../requests.service';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-postedreqs',
  templateUrl: './postedreqs.component.html',
  styleUrls: ['./postedreqs.component.css']
})
export class PostedreqsComponent implements OnInit {

  constructor(private reqService: RequestsService, private userService: UsersService, private router: Router ) { }

  title: String = "Posted Requests";
  requests: ReqModel[];

  ngOnInit(): void {
    this.reqService.getReqs().subscribe(data =>
      {
        this.requests = this.userService.filterFunc(JSON.parse(JSON.stringify(data)), {email: (JSON.parse(localStorage.getItem('user')).email)})
      });
  }

  updateReq(request:any)
  {
    this.reqService.setter(request);
    this.router.navigate(['/account/update/']);
  }

  deleteReq(request:any)
  {
    this.reqService.deleteReq(request._id)
    .subscribe(data =>
      {
        this.requests.splice(this.requests.indexOf(request),1);
      });
    this.router.navigate(['/account/postedreqs']);
  }

}
