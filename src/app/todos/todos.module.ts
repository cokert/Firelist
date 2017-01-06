import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFire } from 'angularfire2';

import { AuthService } from '../auth/auth.service';
import { TodosComponent } from './todos.component';
import { TodosListComponent } from './todos-lists/todos-list.component';
import { TodosItemsService } from './todos-items.service';
import { TodosListsService } from './todos-lists/todos-lists.service';
import { TodosPathBuilderService } from './todos-pathbuilder.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TodosComponent,
    TodosListComponent
  ],
  exports: [
    TodosComponent,
    TodosListComponent
  ],
  providers: [
    AuthService,
    TodosListsService,
    TodosItemsService,
    AngularFire,
    TodosPathBuilderService
  ]
})
export class TodosModule { }
