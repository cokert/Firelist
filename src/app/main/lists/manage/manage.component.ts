import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseListObservable } from 'angularfire2';

import { ListsService, List } from '../lists.service';
import { ItemsService } from '../../items/items.service';
import { Modal } from 'angular2-modal/plugins/bootstrap';

import 'rxjs/add/operator/delay';

declare let $:any;

@Component({
  selector: 'app-list-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageListComponent implements OnInit {

  @Input() activeList: FirebaseListObservable<List> = null;
  @Input() activeListKey: string = null;
  @Input() creatorId: string = null;

  constructor( public items: ItemsService,
               public lists: ListsService,
               private _modal: Modal,
               private _router: Router ) { }

  ngOnInit() { }

  renameList(event: Event) {
    this.lists.rename(this.activeListKey, $(event.target).val());
  }

  removeAccess(userKey) {
    console.log("remove", userKey, this.activeListKey);
    this.lists.removeAccess(userKey, this.activeListKey);
  }

  deleteItem(itemKey) {
    this.confirmDeletion().then(resultPromise => {
      resultPromise.result.then( result => {
        this.items.delete(this.activeListKey, itemKey)
      }, () => void(0) );
    });
  }

  deleteList() {
    this.confirmDeletion().then(resultPromise => {
      resultPromise.result.then( result => {
        this.lists.delete(this.activeList);
        this._router.navigate(['/lists']);
      }, () => void(0) );
    });
  }

  confirmDeletion() {
    return this._modal.confirm()
      .size('sm')
      .showClose(true)
      .title('Confirm Deletion')
      .body('This action cannot be undone')
      .open()

  }

}
