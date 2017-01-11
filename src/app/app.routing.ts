
import { Router, RouterModule } from '@angular/router';

import {HomeComponent} from './home.component';
import {NotFoundComponent} from './not-found.component';
import {ListsComponent} from './lists/lists.component';

export const routing = RouterModule.forRoot([
  { path: '', component: HomeComponent },
  { path: 'lists', component: ListsComponent },
  { path: '**', component: NotFoundComponent }
]);
