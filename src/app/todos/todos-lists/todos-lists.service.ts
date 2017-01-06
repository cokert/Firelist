import { Injectable,
         EventEmitter } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { AngularFire,
         AuthProviders,
         AuthMethods,
         FirebaseListObservable,
         FirebaseObjectObservable } from 'angularfire2';
import { Observable} from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/share';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';

import { TodosPathBuilderService } from '../todos-pathbuilder.service';
import { TodosItemsService } from '../todos-items.service';

@Injectable()
export class TodosListsService {

  private _usersLists: BehaviorSubject<any> = new BehaviorSubject<any>("");
  private _listChanged: BehaviorSubject<any> = new BehaviorSubject<any>("");

  usersListsChanged$ = this._usersLists.asObservable();
  activeListChanged$ = this._listChanged.asObservable();

  constructor(private _auth: AuthService,
              private _af: AngularFire,
              private _pb: TodosPathBuilderService,
              private _todoItems: TodosItemsService) {
    _auth.AuthChanged.subscribe(x => {
      //if user is logged in
      if (x) {
        let userListPath = this._pb.buildUserListsPath(x.userId);
        let lists = this._af.database.list(userListPath)
          //names are stored under /lists/<id>/name, not under the users branch
          .map(lists => {
            lists.map(list => {
              var path = this._pb.buildListPath(list.$key) + '/name';
              list.name = this._af.database.object(path);
            })
            return lists;
          }).subscribe(x => this._usersLists.next(x));
        //console.log(lists);
        //this._usersLists.next(lists);
      }
    })
  }

  setActiveList(listKey) {
    this._af.database.object(this._pb.buildListPath(listKey)).subscribe(x => {
      var f = {
        name: x.name,
        key: x.$key
      };
      this._listChanged.next(f);
    });
    this._todoItems.setActiveListKey(listKey);
  }

  newList(name) {
    let userListPath = this._pb.buildUserListsPath(this._auth.userData.userId);
    console.log("userListPath", userListPath);
    this._af.database.list(userListPath).push('true')
      .then(x => {
        console.log("listPath", this._pb.buildListPath(x.key));
        this._af.database.object(this._pb.buildListPath(x.key)).set({ name: name });
      });
  }
}
