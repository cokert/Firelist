import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFire } from 'angularfire2';
import { RouterModule } from '@angular/router';

import { AuthService } from '../auth/auth.service';
import { ItemsComponent } from './items/items.component';
import { ListsComponent } from './lists/lists.component';
import { MinimalListsComponent } from './lists/minimal-lists.component';
import { NewListComponent } from './lists/new-list.component';
import { MainViewComponent } from './main-view.component';
import { ItemsService } from './items/items.service';
import { ListsService } from './lists/lists.service';
import { PathBuilderService } from '../shared/pathbuilder.service';
import { GearMenuComponent } from '../shared/gearmenu.component';
import { UsersService } from '../users/users.service';

import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import { ManageListComponent } from './lists/manage/manage.component';
import { DetailsComponent } from './lists/details/details.component';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    ModalModule.forRoot(),
    BootstrapModalModule
  ],
  declarations: [
    ItemsComponent,
    ListsComponent,
    MinimalListsComponent,
    NewListComponent,
    MainViewComponent,
    GearMenuComponent,
    ManageListComponent,
    DetailsComponent
  ],
  exports: [
    ItemsComponent,
    MinimalListsComponent,
    NewListComponent,
    MainViewComponent,
  ],
  providers: [
    AuthService,
    ListsService,
    ItemsService,
    AngularFire,
    PathBuilderService,
    UsersService
  ]
})
export class MainModule { }
