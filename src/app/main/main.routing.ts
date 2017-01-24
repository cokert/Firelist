
import { Router, RouterModule } from '@angular/router';

import { MainViewComponent} from './main-view.component';
import { ListsComponent} from './lists/lists.component';
import { ManageListComponent} from './lists/manage/manage.component';
import { UserIsLoggedInGuard } from '../shared/userloggedinguard.service';

export const mainRouting = RouterModule.forChild([
  { path: 'lists', component: ListsComponent },
  { path: 'lists/:listKey', component: MainViewComponent },
  { path: 'lists/:listKey/manage', component: MainViewComponent },
  { path: 'lists/:listKey/details', component: MainViewComponent }
]);
