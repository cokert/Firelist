import { Injectable,
         EventEmitter } from '@angular/core';
import { AngularFire,
         AuthProviders,
         AuthMethods,
         FirebaseListObservable,
         FirebaseObjectObservable } from 'angularfire2';
import { BehaviorSubject } from 'rxjs/rx';

@Injectable()
export class AuthService {
  userData = null;

  private _authChanged: BehaviorSubject<any> = new BehaviorSubject<any>({});
  authChanged$ = this._authChanged.asObservable();

  constructor(private _af: AngularFire) {
    this._af.auth.subscribe(x => {
      if (x) {
        this.userData = {
          userId: x.uid,
          userPicture: x.google.photoURL
        };
      } else {
        this.userData = {
          userId: null,
          userPicture: null
        };
      };
      this._authChanged.next(this.userData);
    });
 }

  login() {
    this._af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup
    });
  }

  logout() {
    this._af.auth.logout();
  }

}
