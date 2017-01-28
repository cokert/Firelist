import { Injectable } from '@angular/core';
import { Router,
         CanActivate,
         ActivatedRouteSnapshot,
         RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserIsLoggedInGuard implements CanActivate {

  constructor(private _router: Router,
              private _auth: AuthService) {}

  canActivate() {
    if (!this._auth.userData) { return false; }

    return this._auth.userData.userId != null;
  }
}
