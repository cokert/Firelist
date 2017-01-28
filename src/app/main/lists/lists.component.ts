import { Component,
         OnInit,
         Input,
         OnDestroy,
         ViewContainerRef } from '@angular/core';
import { Overlay } from 'angular2-modal';
import { Router, ActivatedRoute } from '@angular/router';
import { Modal } from 'angular2-modal/plugins/bootstrap';

import { ListsService } from './lists.service';
import { ScreenSizeService } from '../../shared/screen-size.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-lists, .app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit, OnDestroy {

  constructor(public lists: ListsService,
              public router: Router,
              private _route: ActivatedRoute,
              public sizeService: ScreenSizeService,
              private _auth: AuthService,
              overlay: Overlay,
              vcRef: ViewContainerRef,
              private _modal: Modal) {
    overlay.defaultViewContainer = vcRef;
}

  ngOnInit() {
    this.lists.usersListsChanged$.subscribe(x => console.log('lists component init', x));
    console.log('lists component init');
  }

  ngOnDestroy() {
    console.log('destroy');
  }

  getMenuData(list) {
    // console.log('getting menu data', list);
    return [ {
      label: 'Share',
      action: {
        func: this.showEmailModal,
        context: this,
        args: [
          list
        ]
      }
    }, {
      label: 'Delete',
      action: {
        func: this.confirmDelete,
        context: this,
        args: [
          list
        ]
      }
    } ];
  }

  showEmailModal(listKey) {
    this._modal.prompt()
      .size('sm')
      .showClose(true)
      .title('Enter email of recipient')
      .open()
      .then(resultPromise => {
        resultPromise.result.then( result => {
          this.lists.share(result, listKey);
        }, () => console.log('email fail?')
      ); });
  }

  confirmDelete(listKey) {
    this._modal.confirm()
      .size('sm')
      .showClose(false)
      .title('Delete list?')
      .body('This action is irreversible.')
      .open()
      .then(resultPromise => {
        resultPromise.result.then(result => {
          if (result) { this.lists.delete(listKey); };
        }, () => true);
      });
  }
}
