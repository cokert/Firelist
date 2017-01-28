import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ItemsService } from './items.service';
import { ListsService } from '../lists/lists.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  @Input() activeList = null;
  @Input() activeListKey = null;

  archiveOpen = null;

  constructor(public items: ItemsService,
              public lists: ListsService,
              public activedRoute: ActivatedRoute ) {
  }

  ngOnInit() {
    console.log('items, activelist', this.activeList);
  }

  getMenuObject(listKey, itemKey) {
    return [
    {
      label: 'Archive',
      action: {
        func: this.items.archive,
        context: this.items,
        args: [listKey, itemKey]
      }
    },
    {
      label: 'Delete',
      action: {
        func: this.items.delete,
        context: this.items,
        args: [listKey, itemKey]
      }
    }];
  }
}
