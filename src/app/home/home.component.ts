import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  constructor(private _auth : AuthService,
              private _router: Router) { }

  ngOnInit() {
    console.log('home component init');
  }

}
