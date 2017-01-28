import { Component, OnInit } from '@angular/core';

import { ListsService } from './lists.service';

@Component({
  selector: 'app-list-new',
  template: `
            <div>
              New List: <input class='form-control' #id type="text" name="" value="">
              <button class='btn btn-default'
                      (click)="lists.newList(id.value);id.value='';"
                      data-toggle="collapse"
                      data-target="#lists">save
              </button>
            </div>
          `
})
export class NewListComponent implements OnInit {

  constructor(public lists: ListsService) { }

  ngOnInit() {
  }

}
