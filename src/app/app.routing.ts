
import { Router, RouterModule } from '@angular/router';

import {HomeComponent} from './home/home.component';
import {NotFoundComponent} from './not-found.component';

export const routing = RouterModule.forRoot([
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: '**', component: NotFoundComponent }
]);
