import { Component, OnInit, Input } from '@angular/core';

import { ScreenSizeService } from '../../../shared/screen-size.service';
import { ItemsService } from '../../items/items.service';

@Component({
  selector: 'app-list-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  @Input() activeList = null;
  @Input() activeListKey = null;
  @Input() creatorId: string = null;

    constructor( public items: ItemsService,
                 public sizeService: ScreenSizeService) { }

  ngOnInit() {
  }

}
