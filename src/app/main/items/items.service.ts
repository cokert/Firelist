import { Injectable,
         EventEmitter } from '@angular/core';
import { AngularFire,
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

  constructor(private _af: AngularFire,
              private _pb: PathBuilderService) {
  }

  archive(listKey, itemKey) {
    var sourcePath = this._pb.buildItemPath(listKey, itemKey);
    var destinationPath = this._pb.buildArchivedItemPath(listKey, itemKey)
    this.moveItem(sourcePath, destinationPath);
  }

  moveItem(sourcePath, destinationPath) {
    this.copyItem(sourcePath, destinationPath);
    this._af.database.object(sourcePath).set(null);
  }

  copyItem(sourcePath, destinationPath) {
    this._af.database.object(sourcePath).take(1).subscribe(x => {
      delete x.$key;
      delete x.$exists;
      this._af.database.object(destinationPath).set(x);
    });
  }

  restore(listKey, itemKey) {
    var sourcePath = this._pb.buildArchivedItemPath(listKey, itemKey);
    var destinationPath = this._pb.buildItemPath(listKey, itemKey);
    this.moveItem(sourcePath, destinationPath);
  }

  delete(listKey, itemKey) {
    this._af.database.object(this._pb.buildItemPath(listKey, itemKey)).set(null);
  }

  addToList(key, value) {
    let path = this._pb.buildListItemsPath(key);
    this._af.database.list(path).push({
      name: value,
      complete: false
    });
  }

  toggleCompletionState(listKey, itemKey, completionState) {
    let path = this._pb.buildItemPath(listKey, itemKey);
    this._af.database.object(path).update({ complete: completionState});
  }
}
