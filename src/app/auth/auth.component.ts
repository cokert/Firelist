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

  userData = null;

  constructor(public auth: AuthService) { }

  ngOnInit() {
    this.auth.authChanged$.subscribe(x => this.userData = x);
  }

}
