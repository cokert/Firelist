import { Injectable,
         EventEmitter } from '@angular/core';
import { AngularFire,
         AuthProviders,
         AuthMethods,
         FirebaseListObservable,
         FirebaseObjectObservable } from 'angularfire2';
import { Observable} from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/rx';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/share';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';

import { AuthService } from '../../auth/auth.service';
import { PathBuilderService } from '../../shared/pathbuilder.service';
import { ItemsService } from '../items/items.service';

@Injectable()
export class ListsService {

  private _listsSubscription;
  private _activeListSubscription;
  private _usersLists: BehaviorSubject<any> = new BehaviorSubject<any>("");
  private _listChanged: BehaviorSubject<any> = new BehaviorSubject<any>("");

  usersListsChanged$ = this._usersLists.asObservable();
  activeListChanged$ = this._listChanged.asObservable();

  activeListKey = null;

  constructor(private _auth: AuthService,
              private _af: AngularFire,
              private _pb: PathBuilderService,
              private _items: ItemsService) {
    _auth.authChanged$.subscribe(x => {
      //if user is logged in
      if (x.userId) {
        //console.log('logged in: ', x);
        let userListPath = this._pb.buildUserListsPath(x.userId);
        this._listsSubscription = this._af.database.list(userListPath)
          //names are stored under /lists/<id>/name, not under the users branch
          .map(lists => {
            lists.map(list => {
              var path = this._pb.buildListPath(list.$key) + '/name';
              list.name = this._af.database.object(path);
            })
            return lists;
          }).subscribe(x => this._usersLists.next(x));
      }
      else {
        //console.log('not logged in');
        if (this._listsSubscription) this._listsSubscription.unsubscribe();
        if (this._activeListSubscription) this._activeListSubscription.unsubscribe();
        this._usersLists.next([]);
        this._listChanged.next([]);
        this._items.setNoActiveList();
      }
    })
  }

  selectList(listKey) {
    this._activeListSubscription = this._af.database.object(this._pb.buildListPath(listKey))
      .subscribe(x => {
        var f = {
          name: x.name,
          key: x.$key
        };
        this.activeListKey = listKey;
        this._listChanged.next(f);
    });
    this._items.setActiveListKey(listKey);
  }

  newList(name) {
    let userListPath = this._pb.buildUserListsPath(this._auth.userData.userId);
    //console.log("userListPath", userListPath);
    this._af.database.list(userListPath).push('true')
      .then(x => {
        //console.log("listPath", this._pb.buildListPath(x.key));
        this._af.database.object(this._pb.buildListPath(x.key)).set({
            name: name,
            creator: this._auth.userData.userId,
            dateCreated: Date()
          });
        this.selectList(x.key);
      });
  }
}
