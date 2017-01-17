import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFire } from 'angularfire2';

import { AuthService } from '../auth/auth.service';
import { ItemsComponent } from './items/items.component';
import { ListsComponent } from './lists/lists.component';
import { NewListComponent } from './lists/new-list.component';
import { MainViewComponent } from './main-view.component';
import { ItemsService } from './items/items.service';
import { ListsService } from './lists/lists.service';
import { PathBuilderService } from '../shared/pathbuilder.service';
import { GearMenuComponent } from '../shared/gearmenu.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ItemsComponent,
    ListsComponent,
    NewListComponent,
    MainViewComponent,
    GearMenuComponent
  ],
  exports: [
    ItemsComponent,
    ListsComponent,
    NewListComponent,
    MainViewComponent,
  ],
  providers: [
    AuthService,
    ListsService,
    ItemsService,
    AngularFire,
    PathBuilderService
  ]
})
export class MainModule { }
