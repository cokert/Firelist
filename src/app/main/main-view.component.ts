import { Component,
         OnInit } from '@angular/core';

import { ListsService } from './lists/lists.service'
import { ScreenSizeService } from '../shared/screen-size.service';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html'
})
export class MainViewComponent implements OnInit {

  constructor(private _main: ListsService,
              private _sizeService: ScreenSizeService) { }

  ngOnInit() {
  }
}
