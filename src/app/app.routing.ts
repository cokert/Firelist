
import { Router, RouterModule } from '@angular/router';

import {HomeComponent} from './home.component';

export const routing = RouterModule.forRoot([
  { path: '', component: HomeComponent },
  { path: 'users/new', component: NewUserComponent, canDeactivate: [ DirtyTrackingGuard ] },
  { path: 'users', component: UsersComponent },
  { path: 'posts', component: PostsComponent },
  { path: '**', component: NotFoundComponent }
]);
