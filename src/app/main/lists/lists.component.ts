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

  @Input() showChrome = true;

  constructor(private _lists : ListsService,
              private _router: Router,
              private _route: ActivatedRoute,
              private _sizeService: ScreenSizeService,
              private _auth: AuthService,
              overlay: Overlay,
              vcRef: ViewContainerRef,
              private _modal: Modal) {
    overlay.defaultViewContainer = vcRef;
}

  ngOnInit() {
    this._lists.usersListsChanged$.subscribe(x => console.log("lists component init", x));
    console.log("'lists component init'");
  }

  ngOnDestroy() {
    console.log('destroy');
  }

  getMenuData(list) {
    console.log('getting menu data', list);
    return [{
      label: "Share",
      action: {
        func: this.showEmailModal,
        context: this,
        args: [
          list.$key
        ]
      }
    },{
      label: "Delete",
      action: {
        func: this.confirmDelete,
        context: this,
        args: [
          list
        ]
      }
    },]
  }

  showEmailModal(listKey) {
    this._modal.prompt()
      .size('sm')
      .showClose(true)
      .title('Enter email of recipient')
      .open()
      .then(resultPromise => {
        resultPromise.result.then( result => {
          this._lists.share(result, listKey);
        }, () => console.log("email fail?")
      )});
  }

  showListDetails(e: Event, list) {
    e.stopImmediatePropagation();
    this._modal.alert()
      .size('lg')
      .showClose(true)
      .title('List Details')
      .body(`
        <div class='row'>
          <div class='col-xs-3'>
            Name:
          </div>
          <div class='col-xs-9'>
            ` + list.name + `
          </div>
        </div>
        <div class='row'>
          <div class='col-xs-3'>
            Creator:
          </div>
          <div class='col-xs-9'>
            ` + list.creatorName + `
          </div>
        </div>
        <div class='row'>
          <div class='col-xs-3'>
            Date Created:
          </div>
          <div class='col-xs-9'>
            ` + list.dateCreated + `
          </div>
        </div>
        <div class='row'>
          <div class='col-xs-3'>
            Number of users with access:
          </div>
          <div class='col-xs-9'>
            ` + list.usersWithAccess.length + `
          </div>
        </div>`)
      .open()
  }

  confirmDelete(listKey) {
    var f = this._modal.confirm()
      .size('sm')
      .showClose(false)
      .title('Delete list?')
      .body('This action is irreversible.')
      .open()
      .then(resultPromise => {
        resultPromise.result.then(result => {
          if (result) this._lists.delete(listKey);
        }, () => true);
      });
  }
}
