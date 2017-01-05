import { Injectable,
         EventEmitter } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { AngularFire,
         AuthProviders,
         AuthMethods,
         FirebaseListObservable,
         FirebaseObjectObservable } from 'angularfire2';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';

@Injectable()
export class TodosService {
  _userNode = null;
  _lists = null;
  _activeList = null;
  _activeListKey = null;

  private _userListPath = null;

  ActiveListChanged: EventEmitter<any> = new EventEmitter();
  ListsChanged: EventEmitter<any> = new EventEmitter();

  constructor(private _auth: AuthService,
              private _af: AngularFire ) {
    _auth.AuthChanged.subscribe(x => {
      if (x) {
        this._userListPath = this.buildUserListsPath(x.userId);
        let lists = this._af.database.list(this._userListPath)
          //names are stored under /lists/<id>/name, not under the users brang
          .map(lists => {
            lists.map(list => {
              var path = this.buildListPath(list.$key) + '/name';
              //console.log(path);
              list.name = this._af.database.object(path);
              return list;
            })
            return lists;
          });
        this.ListsChanged.emit(lists);
      } else {
        this._userNode = null;
        this._userListPath = null;
        this.ListsChanged.emit(null);
      }
    })
  }

  addToList(key, value) {
    let path = this.buildListItemsPath(key);
    console.log('service.addToList', key, value, path);
    this._af.database.list(path).push({
      name: value,
      complete: false
    });
  }

  newList(name) {
    console.log("userListPath", this._userListPath);
    this._af.database.list(this._userListPath).push('true')
      .then(x => {
        console.log("listPath", this.buildListPath(x.key));
        this._af.database.object(this.buildListPath(x.key)).set({ name: name });
      });
  }

  setActiveList(listKey) {
    if (!this._auth.userData) return null;

    this._activeListKey = listKey;

    let list = this._af.database.object(this.buildListPath(listKey));
    let items = this._af.database.list(this.buildListItemsPath(listKey));

    this.ActiveListChanged.emit({
      list: list,
      listKey: listKey,
      items: items
    });
  }

  private buildUserListsPath(userId) {
    return '/users/' + userId + '/lists';
  }

  private buildListPath(listKey) {
    return '/lists/' + listKey;
  }

  private buildListItemsPath(listKey) {
    return this.buildListPath(listKey) + '/items';
  }

  private buildItemPath(listKey, itemKey) {
    return this.buildListItemsPath(listKey) + '/' + itemKey;
  }

  toggleCompletionState(listKey, itemKey, completionState) {
    let path = this.buildItemPath(listKey, itemKey);
    console.log('toggleCompletionState', path);
    this._af.database.object(path).update({ complete: completionState});
  }

}
