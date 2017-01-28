import { Injectable,
         EventEmitter } from '@angular/core';
import { AngularFire,
         AuthProviders,
         AuthMethods,
         FirebaseListObservable,
         FirebaseObjectObservable } from 'angularfire2';
import { Router } from '@angular/router';
import { Observable} from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/rx';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/share';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';

import { AuthService } from '../../auth/auth.service';
import { PathBuilderService } from '../../shared/pathbuilder.service';
import { ItemsService } from '../items/items.service';
import { UsersService } from '../../users/users.service';

export class List {
  $key: string;
  name: string;
  creatorId: string;
  dateCreated: string;
  userIsOwner: boolean;
  usersWithAccess: FirebaseListObservable<any>;
  items: FirebaseListObservable<any>;
  archive: FirebaseListObservable<any>;
  creatorName: string;
}

@Injectable()
export class ListsService {

  private _listsSubscription;
  private _activeListSubscription;
  private _usersLists: BehaviorSubject<any> = new BehaviorSubject<any>('');
  private _listChanged: BehaviorSubject<any> = new BehaviorSubject<any>('');

  usersListsChanged$ = this._usersLists.asObservable();
  activeListChanged$ = this._listChanged.asObservable();

  activeListKey = null;

  constructor(private _auth: AuthService,
              private _af: AngularFire,
              private _pb: PathBuilderService,
              private _items: ItemsService,
              private _users: UsersService,
              private _router: Router) {

    _auth.authChanged$.subscribe(x => {
      // if user is logged in
      if (x.userId) {
        let userListPath = this._pb.buildUserListsPath(x.userId);
        this._listsSubscription = this._af.database.list(userListPath)
          .map(lists => {
            lists.map(list => {
              this._fillListDetails(list);
            });
            console.log('inside map', lists);
            return lists;
          }).subscribe(y => { console.log('emitting', y); this._usersLists.next(y); });
      } else {
        if (this._listsSubscription) { this._listsSubscription.unsubscribe(); };
        if (this._activeListSubscription) { this._activeListSubscription.unsubscribe(); };
        this._usersLists.next([]);
        this._listChanged.next([]);
      }
    });
  }

  private _fillListDetails(list: List) {
    let path = this._pb.buildListPath(list.$key);
    this._af.database.object(path).subscribe(y => {
      list.name = y.name;
      list.creatorId = y.creator;
      list.dateCreated = y.dateCreated;
      list.userIsOwner = y.creator === this._auth.userData.userId;
      this.getUsersWithListAccess(list);
      this._af.database.object(this._pb.buildUserPath(y.creator))
        .subscribe(z => {
          list.creatorName = z.displayName;
      });
    });
  }

  getList(listKey) {
    return this._af.database.object(this._pb.buildListPath(listKey)).map(x => {
      this._fillListDetails(x);
      x.items = this._af.database.list(this._pb.buildListItemsPath(listKey));
      x.archive = this._af.database.list(this._pb.buildListArchivePath(listKey));
      return x;
    });
  }

  getUsersWithListAccess(list: List) {
    list.usersWithAccess = this._af.database.list(this._pb.buildUsersPath(), {
      query: {
        orderByChild: 'lists/' + list.$key,
        equalTo: 'true'
      }
    });
  }

  share(email: string, listKey: any) {
    this._users.getUserByEmail(email).take(1).subscribe(x => {
      let userId = x[0].userId;
      console.log('sharing list', this._pb.buildUserListPath(userId, listKey));
      this._af.database.object(this._pb.buildUserListPath(userId, listKey)).set('true');
    });
  }

  delete(list: FirebaseListObservable<List>) {
    list.delay(10).subscribe( (x: List) => {
      console.log('listpath', this._pb.buildListPath(x.$key), 'list', x, 'keys', Object.keys(x));
      console.log("userswithaccess", x['usersWithAccess']);
      x.usersWithAccess.forEach( u => {
        console.log('removing access for', u.displayName, 'path', this._pb.buildUserListPath(u.$key, x.$key));
        this.removeAccess(u.$key, x.$key);
      });
      this._af.database.object(this._pb.buildListPath(x.$key)).remove();
    });
  }

  removeAccess(userKey, listKey) {
    this._af.database.object(this._pb.buildUserListPath(userKey, listKey)).remove();
  }

  newList(name) {
    let userListPath = this._pb.buildUserListsPath(this._auth.userData.userId);
    this._af.database.list(userListPath).push('true')
      .then(x => {
        this._af.database.object(this._pb.buildListPath(x.key)).set({
            name: name,
            creator: this._auth.userData.userId,
            dateCreated: Date()
          });
          this._router.navigate(['/lists/', x.key]);
      });
  }

  rename(listKey, name) {
    let listPath = this._pb.buildListPath(listKey);
    this._af.database.object(listPath).update({
      name: name
    });
  }
}
