import { Injectable } from '@angular/core';

@Injectable()
export class PathBuilderService {

  constructor() { }

  buildUserListsPath(userId) {
    return this.buildUserPath(userId) + '/lists';
  }

  buildUserListPath(userId, listId) {
    return this.buildUserListsPath(userId) + '/' + listId;
  }

  buildListPath(listKey) {
    return '/lists/' + listKey;
  }

  buildListItemsPath(listKey) {
    return this.buildListPath(listKey) + '/items';
  }

  buildArchiveItemsPath(listKey) {
    return this.buildListPath(listKey) + '/archive';
  }

  buildArchiveItemPath(listKey, itemKey) {
    return this.buildArchiveItemsPath(listKey) + '/' + itemKey;
  }

  buildItemPath(listKey, itemKey) {
    return this.buildListItemsPath(listKey) + '/' + itemKey;
  }

  buildUserPath(userId) {
    return '/users/' + userId;
  }

}
