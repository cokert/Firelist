import { Component, OnInit } from '@angular/core';

import { ItemsService } from './items.service';
import { ListsService } from '../lists/lists.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  private _listKey = null;
  private _listName = null;

  constructor(private _items: ItemsService,
              private _lists: ListsService ) {
  }

  ngOnInit() {
    this._lists.activeListChanged$.subscribe(x => {
      if (x != '') {
        this._listKey = x.key;
        this._listName = x.name;
      }
    });
  }

}
