import { Component, OnInit } from '@angular/core';

import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UsersService]
})
export class AppComponent implements OnInit {
  title = 'FireList';

  constructor(private _auth: AuthService,
              private _users: UsersService) { }

  ngOnInit() {
  }

}
