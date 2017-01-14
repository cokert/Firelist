import { Component,
         OnInit,
         OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ListsService } from './lists.service';
import { ScreenSizeService } from '../../shared/screen-size.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit, OnDestroy {

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

  routeToList(key) {
    this._router.navigate(["lists", key]);
    this._lists.selectList(key);
  }

}
