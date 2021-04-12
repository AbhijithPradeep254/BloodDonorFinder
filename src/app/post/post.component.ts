import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReqModel } from '../request/req.model';
import { RequestsService } from '../requests.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  constructor(private reqService: RequestsService, private router: Router, private activatedRoute: ActivatedRoute) { }
  
  title: String = "Post Your Request Here";
  postInfo: ReqModel;
  id: string;
  ngOnInit(): void {
    // this.activatedRoute.paramMap.subscribe(param =>
    //   {
    //     this.id = param.get("id");
    //   })
    this.postInfo = this.reqService.getter();
  }

  PostOrUpdateReq()
  {
    if (this.postInfo._id==undefined)
    {
      this.reqService.postReq(this.postInfo);
      console.log("post success");
    }
    else
    {
      this.reqService.updateReq(this.postInfo);
      console.log("update success");
      console.log(this.postInfo);
    }
    this.router.navigate(['/account/postedreqs']);
  }

  // PostReq()
  // {
  //   this.reqService.postReq(this.postInfo);
  //   console.log("success");
  //   this.router.navigate(['/account/requests']);
  // }

}
