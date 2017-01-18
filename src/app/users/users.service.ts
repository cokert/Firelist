import { Injectable } from '@angular/core';
import { AngularFire,
         AuthProviders,
         AuthMethods,
         FirebaseListObservable,
         FirebaseObjectObservable } from 'angularfire2';
import { Observable} from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/rx';
import { Subject } from 'rxjs/Subject';

import { PathBuilderService } from '../shared/pathbuilder.service';

import 'rxjs/add/operator/share';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';

@Injectable()
export class UsersService {

  constructor(private _af: AngularFire,
              private _pb: PathBuilderService) { }

  getUserByEmail(email) {
    return this._af.database.list(this._pb.buildUsersPath(), {
      query: {
        orderByChild: 'email',
        equalTo: email
      }
    });
  }

  getUsers() {
    return this._af.database.list(this._pb.buildUsersPath());
  }
}
