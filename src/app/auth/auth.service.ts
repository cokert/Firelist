import { Injectable,
         EventEmitter } from '@angular/core';
import { AngularFire,
         AuthProviders,
         AuthMethods,
         FirebaseListObservable,
         FirebaseObjectObservable } from 'angularfire2';

@Injectable()
export class AuthService {
  userData = null;
  AuthChanged: EventEmitter<any> = new EventEmitter();

  constructor(private _af: AngularFire) {
    this._af.auth.subscribe(x => {
      if (x) {
        this.userData = {
          userId: x.uid,
          userPicture: x.google.photoURL
        };
      } else {
        this.userData = null;
      };
      this.AuthChanged.emit(this.userData);
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
