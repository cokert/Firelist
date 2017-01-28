import { Component,
         OnInit } from '@angular/core';

import { ListsService } from './lists.service';

@Component({
  selector: 'app-lists-minimal, .app-lists-minimal',
  template: `
    <ng-container>
      <li role="button" *ngFor="let l of _lists.usersListsChanged$ | async" [routerLink] = "['/lists', l.$key]">
        <a class="hand">
          {{ l.name }}
        </a>
      </li>
    </ng-container>
  `
})
export class MinimalListsComponent implements OnInit {

  constructor(private _lists: ListsService) { }

  ngOnInit() {
  }
}
