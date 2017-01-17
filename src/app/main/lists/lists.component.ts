import { Component,
         OnInit,
         Input,
         OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

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
              private _sizeService: ScreenSizeService) { }

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
    }]
  }

  routeToList(key) {
    this._router.navigate(["lists", key]);
    this._lists.selectList(key);
  }

}
