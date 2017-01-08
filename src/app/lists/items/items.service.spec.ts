/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ItemsService } from './items.service';

describe('TodosItemsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodosItemsService]
    });
  });

  it('should ...', inject([TodosItemsService], (service: TodosItemsService) => {
    expect(service).toBeTruthy();
  }));
});
