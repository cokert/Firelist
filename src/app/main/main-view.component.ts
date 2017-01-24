import { Component,
         OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ListsService } from './lists/lists.service'
import { ScreenSizeService } from '../shared/screen-size.service';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html'
})
export class MainViewComponent implements OnInit {

  _activeList = null;
  _activeView = "";

  constructor(private _lists: ListsService,
              private _sizeService: ScreenSizeService,
              private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this._activatedRoute.url.subscribe(segments => {
      if (segments.length === 2) {
        this._activeView = 'items';
      }
      else if (segments.length === 3) {
        this._activeView = segments[2].path;
      }
    });
    this._activatedRoute.params.subscribe(x =>
      this._lists.getList(x["listKey"]).subscribe( y => {
        this._activeList = y;
      }));
  }
}
