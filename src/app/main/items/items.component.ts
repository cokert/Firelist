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

  dat =
    [
      {label: 'test', action: { func: alert, args: ['asdf', 2, 'arg2']}},
      {label: 'test2', action: { func: alert, args: ['fdsa', 2, 'arg2']}}
    ];

  getMenuObject(listKey, itemKey) {
    return [
    {
      label: "Archive",
      action: {
        func: this._items.archive,
        context: this._items,
        args: [itemKey]
      }
    },
    {
      label: "Delete",
      action: {
        func: this._items.delete,
        context: this._items,
        args: [itemKey]
      }
    }]
  }

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
