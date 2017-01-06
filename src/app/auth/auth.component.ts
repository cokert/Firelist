import { Component,
         OnInit,
         EventEmitter } from '@angular/core';
import { AngularFire,
         AuthProviders,
         AuthMethods,
         FirebaseListObservable,
         FirebaseObjectObservable } from 'angularfire2';

import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  private _userData = null;

  constructor(private _auth: AuthService) { }

  ngOnInit() {
    this._auth.authChanged$.subscribe(x => this._userData = x);
  }

}
