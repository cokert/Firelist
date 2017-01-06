import { Component, OnInit } from '@angular/core';

import { TodosListsService } from './todos-lists.service';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.css']
})
export class TodosListComponent implements OnInit {

  constructor(private _todoLists : TodosListsService) { }

  ngOnInit() {
      //this._todoLists.getUsersLists().subscribe(x => console.log("sub output", x));
      this._todoLists.activeListChanged$.subscribe(x => console.log("list changed sub output", x));
  }

}
