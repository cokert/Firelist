import { Component, OnInit } from '@angular/core';

import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './home.component.html',
  styleUrls: ['./app.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _auth : AuthService) { }

  ngOnInit() {
  }

}
