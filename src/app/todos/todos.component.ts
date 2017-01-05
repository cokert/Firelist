import { Component, OnInit } from '@angular/core';

import { TodosService } from './todos.service';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  usersLists = null;
  selectedList = null;
  selectedListKey = null;
  selectedListItems = null;

  constructor(private _todos: TodosService) { }

  ngOnInit() {
    this._todos.ListsChanged.subscribe(x => this.usersLists = x);
    this._todos.ActiveListChanged.subscribe(x => {
      console.log('ActiveListChanged', x);
      this.selectedList = x.list;
      this.selectedListKey = x.listKey;
      this.selectedListItems = x.items;
    });
  }

  addToList(name) {
    this._todos.addToList(this.selectedListKey, name);
  }

  newList(name) {
    this._todos.newList(name);
  }

  setActiveList(listKey) {
    this._todos.setActiveList(listKey);
  }

  toggleCompletion(itemKey, completionState) {
    console.log('toggleComplete', this.selectedListKey, itemKey);
    this._todos.toggleCompletionState(this.selectedListKey, itemKey, completionState);
  }

}
