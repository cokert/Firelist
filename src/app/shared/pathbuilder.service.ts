import { Injectable } from '@angular/core';

@Injectable()
export class PathBuilderService {

  constructor() { }

  buildUserListsPath(userId) {
    return this.buildUserPath(userId) + '/lists';
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

  buildUserPath(userId) {
    return '/users/' + userId;
  }

}
