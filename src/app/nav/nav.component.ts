import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth/auth.service';
import { ScreenSizeService }  from '../shared/screen-size.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private _auth: AuthService,
              private _screenSize: ScreenSizeService ) { }

  ngOnInit() {
  }

}
