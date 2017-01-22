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
  usersWithAccess: any[];
  creatorName: string;
}

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
              private _items: ItemsService,
              private _users: UsersService,
              private _router: Router) {

    _auth.authChanged$.subscribe(x => {
      //if user is logged in
      if (x.userId) {
        let userListPath = this._pb.buildUserListsPath(x.userId);
        this._listsSubscription = this._af.database.list(userListPath)
          .map(lists => {
            lists.map(list => {
              this._fillListDetails(list);
            });
            console.log('inside map', lists);
            return lists;
          }).subscribe(x => { console.log('emitting', x); this._usersLists.next(x); });
      }
      else {
        if (this._listsSubscription) this._listsSubscription.unsubscribe();
        if (this._activeListSubscription) this._activeListSubscription.unsubscribe();
        this._usersLists.next([]);
        this._listChanged.next([]);
      }
    })
  }

  private _fillListDetails(list: List) {
    var path = this._pb.buildListPath(list.$key);
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
    list.usersWithAccess = [];
    this._af.database.list(this._pb.buildUsersPath(), {
      query: {
        orderByChild: 'lists/' + list.$key,
        equalTo: "true"
      }
    }).subscribe(x => {
      for(var i = 0; i < x.length; i ++)
        list.usersWithAccess.push(x[i]);
    });
  }

  share(email: string, list: List) {
    this._users.getUserByEmail(email).take(1).subscribe(x => {
      var userId = x[0].userId;
      this._af.database.object(this._pb.buildUserListPath(userId, list.$key)).set(true);
    })
  }

  delete(list: List) {
    console.log('deleting?');
    console.log('listpath', this._pb.buildListPath(list.$key));
    console.log('list:', list);
    list.usersWithAccess.forEach( u => {
      console.log('removing access for', u.displayName, 'path', this._pb.buildUserListPath(u.$key, list.$key));
      this._af.database.object(this._pb.buildUserListPath(u.$key, list.$key)).remove();
    });
    this._af.database.object(this._pb.buildListPath(list.$key)).remove();
  }

  newList(name) {
    let userListPath = this._pb.buildUserListsPath(this._auth.userData.userId);
    this._af.database.list(userListPath).push("true")
      .then(x => {
        this._af.database.object(this._pb.buildListPath(x.key)).set({
            name: name,
            creator: this._auth.userData.userId,
            dateCreated: Date()
          });
          this._router.navigate(['/lists/', x.key]);
      });
  }
}
