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

import { PathBuilderService } from '../../shared/pathbuilder.service';

@Injectable()
export class ItemsService {

  private _listItems: BehaviorSubject<any> = new BehaviorSubject<any>("");
  private _archiveItems: BehaviorSubject<any> = new BehaviorSubject<any>("");
  private _activeListSubscription;
  private _activeArchiveSubscription;

  listItemsChanged$ = this._listItems.asObservable();
  listArchiveChanged$ = this._archiveItems.asObservable();

  activeListItems = null;
  activeListKey = null;

  constructor(private _af: AngularFire,
              private _pb: PathBuilderService) {
  }

  setNoActiveList() {
    //console.log('setting no active');
    if (this._activeListSubscription) {
      //console.log('unsubbed');
      this._activeListSubscription.unsubscribe();
    }
  }

  archive(itemKey) {
    var itemPath = this._pb.buildItemPath(this.activeListKey, itemKey);
    this._af.database.object(itemPath).take(1).subscribe(x => {
      var archivePath = this._pb.buildArchiveItemPath(this.activeListKey, itemKey);
      var f = { name: x.name, complete: x.complete };
      this._af.database.object(archivePath).set(f);
      this._af.database.object(itemPath).set(null);
    });
  }

  restore(itemKey) {
    var archivePath = this._pb.buildArchiveItemPath(this.activeListKey, itemKey);
    this._af.database.object(archivePath).take(1).subscribe(x => {
      var itemPath = this._pb.buildItemPath(this.activeListKey, itemKey);
      console.log("archivePath", archivePath, "itemPath", itemPath, "key", this.activeListKey, "itemKey", itemKey);
      var f = { name: x.name, complete: x.complete };
      this._af.database.object(itemPath).set(f);
      this._af.database.object(archivePath).set(null);
    });
  }

  delete(itemKey) {
    this._af.database.object(this._pb.buildItemPath(this.activeListKey, itemKey)).set(null);
  }

  setActiveListKey(listKey) {
    if (this._activeListSubscription) this._activeListSubscription.unsubscribe();
    this.activeListKey = listKey;
    this._activeListSubscription = this._af.database.list(this._pb.buildListItemsPath(listKey)).subscribe(x => {
      //console.log("activeListSub, pushing ", x);
      this._listItems.next(x)
    });
    this._activeArchiveSubscription = this._af.database.list(this._pb.buildArchiveItemsPath(listKey)).subscribe(x => {
      this._archiveItems.next(x);
    })
  }

  addToList(key, value) {
    let path = this._pb.buildListItemsPath(key);
    //console.log('service.addToList', key, value, path);
    this._af.database.list(path).push({
      name: value,
      complete: false
    });
  }

  toggleCompletionState(listKey, itemKey, completionState) {
    let path = this._pb.buildItemPath(listKey, itemKey);
    //console.log('toggleCompletionState', path);
    this._af.database.object(path).update({ complete: completionState});
  }

}
