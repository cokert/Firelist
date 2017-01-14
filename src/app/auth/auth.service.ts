import { Injectable,
         EventEmitter } from '@angular/core';
import { AngularFire,
         AuthProviders,
         AuthMethods,
         FirebaseListObservable,
         FirebaseObjectObservable } from 'angularfire2';
import { BehaviorSubject } from 'rxjs/rx';

import { PathBuilderService } from '../shared/pathbuilder.service';

@Injectable()
export class AuthService {
  private _nullUser = {
      userId: null,
      userPicture: null,
      displayName: null,
      email: null
    };
  userData = this._nullUser;

  private _authChanged: BehaviorSubject<any> = new BehaviorSubject<any>({});
  authChanged$ = this._authChanged.asObservable();

  constructor(private _af: AngularFire,
              private _pb: PathBuilderService) {
    this._af.auth.subscribe(x => {
      if (x) {
        //console.log("logged in", x);
        this.userData = {
          userId: x.uid,
          userPicture: x.google.photoURL,
          displayName: x.google.displayName,
          email: x.google.email
        };

        let p = _pb.buildUserPath(this.userData.userId);
        this._af.database.object(p).update(this.userData);
      } else {
        //console.log("not logged in", x);
        this.userData = this._nullUser;
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
