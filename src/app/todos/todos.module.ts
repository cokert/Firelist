import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFire } from 'angularfire2';

import { TodosService } from './todos.service';
import { TodosComponent } from './todos.component';

import { AuthService } from '../auth/auth.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TodosComponent
  ],
  exports: [
    TodosComponent
  ],
  providers: [
    AuthService,
    TodosService,
    AngularFire
  ]
})
export class TodosModule { }
