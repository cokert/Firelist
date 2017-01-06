import { Component, OnInit } from '@angular/core';

import { TodosItemsService } from './todos-items.service';
import { TodosListsService } from './todos-lists/todos-lists.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  private _listKey = null;
  private _listName = null;

  constructor(private _todos: TodosItemsService,
              private _todoLists: TodosListsService ) {
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
