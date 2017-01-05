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
  auth = null;

  constructor(private _auth: AuthService) { }

  ngOnInit() {
    this._auth.AuthChanged.subscribe(x => this.auth = x);
  }

  login() { this._auth.login(); }
  logout() { this._auth.logout(); }

}
