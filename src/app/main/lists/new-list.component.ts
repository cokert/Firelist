import { Component, OnInit } from '@angular/core';

import { ListsService } from './lists.service';

@Component({
  selector: 'app-list-new',
  template: `
            <div class='input-group'>
              <input class='form-control' #id type="text" name="" value="" placeholder='New list name...'>
              <div class='input-group-btn'>
                <button class='btn btn-default'
                        (click)="lists.newList(id.value);id.value='';"
                        data-toggle="collapse"
                        data-target="#lists">
                  <span class='glyphicon glyphicon-ok'></span>
                </button>
              </div>
            </div>
          `
})
export class NewListComponent implements OnInit {

  constructor(public lists: ListsService) { }

  ngOnInit() {
  }

}
