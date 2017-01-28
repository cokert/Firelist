import { Component,
         OnInit } from '@angular/core';
import { ActivatedRoute,
         Router,
         UrlTree } from '@angular/router';

import { ListsService } from './lists/lists.service';
import { ScreenSizeService } from '../shared/screen-size.service';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html'
})
export class MainViewComponent implements OnInit {

  activeList = null;
  activeListKey = null;
  activeView = '';

  constructor(public lists: ListsService,
              public sizeService: ScreenSizeService,
              public activatedRoute: ActivatedRoute,
              public router: Router) { }

  ngOnInit() {
    this.activatedRoute.url.subscribe(segments => {
      if (segments.length === 2) {
        // we're at /lists/<id>/, load just the items component
        this.activeView = 'items';
      } else if (segments.length === 3) {
        // we're at either /lists/<id>/manage or /lists/<id>/details
        this.activeView = segments[2].path;
      }
    });
    this.activatedRoute.params.subscribe(x => {
      this.activeList = this.lists.getList(x['listKey']);
      this.activeListKey = x['listKey'];
    });
  }

  isActive(instruction: any[]): boolean {
    return this.router.isActive(this.router.createUrlTree(instruction), true);
  }
}
