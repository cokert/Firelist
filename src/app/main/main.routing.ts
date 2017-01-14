
import { Router, RouterModule } from '@angular/router';

import { MainViewComponent} from './main-view.component';
import { ListsComponent} from './lists/lists.component';
import { UserIsLoggedInGuard } from '../shared/userloggedinguard.service';

export const mainRouting = RouterModule.forChild([
  { path: 'lists', component: ListsComponent, canActivate: [UserIsLoggedInGuard] },
  { path: 'lists/:listKey', component: MainViewComponent, canActivate: [UserIsLoggedInGuard]}
]);
