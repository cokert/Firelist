/* tslint:disable:no-unused-variable */
import { TestBed, async, inject } from '@angular/core/testing';
import { ListsService } from './lists.service';

import {} from 'jasmine';

describe('ListsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ListsService]
    });
  });

  it('should ...', inject([ListsService], (service: ListsService) => {
    expect(service).toBeTruthy();
  }));
});
