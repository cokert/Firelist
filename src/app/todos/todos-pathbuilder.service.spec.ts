/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TodosPathbuilderService } from './todos-pathbuilder.service';

describe('TodosPathbuilderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodosPathbuilderService]
    });
  });

  it('should ...', inject([TodosPathbuilderService], (service: TodosPathbuilderService) => {
    expect(service).toBeTruthy();
  }));
});
