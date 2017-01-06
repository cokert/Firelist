/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TodosListsService } from './todos-lists.service';

describe('TodosListsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodosListsService]
    });
  });

  it('should ...', inject([TodosListsService], (service: TodosListsService) => {
    expect(service).toBeTruthy();
  }));
});
