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

import { TodosPathBuilderService } from './todos-pathbuilder.service';

@Injectable()
export class TodosItemsService {

  private _listItems: BehaviorSubject<any> = new BehaviorSubject<any>("");
  private _activeListSubscription;

  listItemsChanged$ = this._listItems.asObservable();

  activeListItems = null;
  activeListKey = null;

  constructor(private _af: AngularFire,
              private _pb: TodosPathBuilderService) {
  }

  setNoActiveList() {
    console.log('setting no active');
    if (this._activeListSubscription) {
      console.log('unsubbed');
      this._activeListSubscription.unsubscribe();
    }
  }

  setActiveListKey(listKey) {
    if (this._activeListSubscription) this._activeListSubscription.unsubscribe();
    this._activeListSubscription = this._af.database.list(this._pb.buildListItemsPath(listKey)).subscribe(x => {
      console.log("activeListSub, pushing ", x);
      this._listItems.next(x)
    });
  }

  addToList(key, value) {
    let path = this._pb.buildListItemsPath(key);
    console.log('service.addToList', key, value, path);
    this._af.database.list(path).push({
      name: value,
      complete: false
    });
  }

  toggleCompletionState(listKey, itemKey, completionState) {
    let path = this._pb.buildItemPath(listKey, itemKey);
    console.log('toggleCompletionState', path);
    this._af.database.object(path).update({ complete: completionState});
  }

}
