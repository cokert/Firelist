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
              overlay: Overlay,
              vcRef: ViewContainerRef,
              private _modal: Modal) {
    overlay.defaultViewContainer = vcRef;
}

  ngOnInit() {
    console.log('lists component init');
  }

  ngOnDestroy() {
    console.log('destroy');
  }

  getMenuData(key) {
    return [{
      label: "Delete",
      action: {
        func: this._lists.delete,
        context: this._lists,
        args: [
          key
        ]
      }
    }, {
      label: "Share",
      action: {
        func: this.showModal,
        context: this,
        args: [
          key
        ]
      }
    }]
  }

  showModal(listKey) {
    var f = this._modal.prompt()
      .size('sm')
      .showClose(true)
      .title('Enter email of recipient')
      .open()
      .then(x => x.result)
      .then(x => this._lists.share(x, listKey));

  }

  routeToList(key) {
    this._router.navigate(["lists", key]);
    this._lists.selectList(key);
  }

}
