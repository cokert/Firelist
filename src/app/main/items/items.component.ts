import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ItemsService } from './items.service';
import { ListsService } from '../lists/lists.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  private _activeList = null;
  private _activeListKey = null;

  constructor(private _items: ItemsService,
              private _lists: ListsService,
              private _activedRoute: ActivatedRoute ) {
  }

  ngOnInit() {
    this._activedRoute.params.subscribe(x => {
      this._activeList = this._lists.getList(x["listKey"])
      this._activeList.subscribe(x => this._activeListKey = x.$key);
    });
  }

  getMenuObject(listKey, itemKey) {
    return [
    {
      label: "Archive",
      action: {
        func: this._items.archive,
        context: this._items,
        args: [listKey, itemKey]
      }
    },
    {
      label: "Delete",
      action: {
        func: this._items.delete,
        context: this._items,
        args: [listKey, itemKey]
      }
    }]
  }
}
