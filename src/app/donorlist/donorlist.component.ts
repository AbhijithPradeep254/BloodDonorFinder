import { Component, OnInit } from '@angular/core';
import { UserModel } from '../signup/user.model';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-donorlist',
  templateUrl: './donorlist.component.html',
  styleUrls: ['./donorlist.component.css']
})
export class DonorlistComponent implements OnInit {
  users: UserModel[];
  userTemp: Object[];

  constructor(private usersService: UsersService) { }

  title: String = "Find A Donor"

  ngOnInit(): void {
    this.usersService.getUsers().subscribe(data =>
      {
        this.users = JSON.parse(JSON.stringify(data));
        this.userTemp = this.users;
      });
  }

  filterValues =
  {
    address1: '',
    address2: '',
    blood: ''
  };

  filterData()
  {
    this.userTemp = this.usersService.filterFunc(this.users,this.filterValues);
    console.log(this.userTemp);
    console.log(this.filterValues);
  }

}
