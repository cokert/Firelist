import { Injectable,
         EventEmitter } from '@angular/core';
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

import { TodosPathBuilderService } from './todos-pathbuilder.service';

@Injectable()
export class TodosItemsService {

  private _listItems: BehaviorSubject<any> = new BehaviorSubject<any>("");

  listItemsChanged$ = this._listItems.asObservable();

  activeListItems = null;
  activeListKey = null;

  constructor(private _af: AngularFire,
              private _pb: TodosPathBuilderService) {
  }

  setActiveListKey(listKey) {
    this._af.database.list(this._pb.buildListItemsPath(listKey)).subscribe(x => {
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
