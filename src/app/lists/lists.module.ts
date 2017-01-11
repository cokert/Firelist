import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFire } from 'angularfire2';

import { AuthService } from '../auth/auth.service';
import { ItemsComponent } from './items/items.component';
import { ListsComponent } from './lists.component';
import { NewListComponent } from './new-list.component';
import { ItemsService } from './items/items.service';
import { ListsService } from './lists.service';
import { PathBuilderService } from './pathbuilder.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ItemsComponent,
    ListsComponent,
    NewListComponent
  ],
  exports: [
    ItemsComponent,
    ListsComponent,
    NewListComponent
  ],
  providers: [
    AuthService,
    ListsService,
    ItemsService,
    AngularFire,
    PathBuilderService
  ]
})
export class ListsModule { }
