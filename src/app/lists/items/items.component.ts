import { Component, OnInit } from '@angular/core';

import { ItemsService } from './items.service';
import { ListsService } from '../lists.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  private _listKey = null;
  private _listName = null;

  constructor(private _todos: ItemsService,
              private _todoLists: ListsService ) {
  }

  ngOnInit() {
    this._todoLists.activeListChanged$.subscribe(x => {
      if (x != '') {
        this._listKey = x.key;
        this._listName = x.name;
      }
    });
  }

}
