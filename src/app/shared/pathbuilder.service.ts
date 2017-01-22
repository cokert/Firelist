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

  buildListsPath() {
    return '/lists';
  }
  buildListPath(listKey) {
    return this.buildListsPath() + '/' + listKey;
  }

  buildListItemsPath(listKey) {
    return this.buildListPath(listKey) + '/items';
  }

  buildListArchivePath(listKey) {
    return this.buildListPath(listKey) + '/archive';
  }

  buildArchivedItemPath(listKey, itemKey) {
    return this.buildListArchivePath(listKey) + '/' + itemKey;
  }

  buildItemPath(listKey, itemKey) {
    return this.buildListItemsPath(listKey) + '/' + itemKey;
  }

  buildUsersPath() {
    return '/users';
  }
  buildUserPath(userId) {
    return this.buildUsersPath() + '/' + userId;
  }

}
