import { Injectable } from '@angular/core';

@Injectable()
export class TodosPathBuilderService {

  constructor() { }

  buildUserListsPath(userId) {
    return '/users/' + userId + '/lists';
  }

  buildListPath(listKey) {
    return '/lists/' + listKey;
  }

  buildListItemsPath(listKey) {
    return this.buildListPath(listKey) + '/items';
  }

  buildItemPath(listKey, itemKey) {
    return this.buildListItemsPath(listKey) + '/' + itemKey;
  }

}
