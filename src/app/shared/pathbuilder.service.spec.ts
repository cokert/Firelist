/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PathBuilderService } from './pathbuilder.service';

describe('PathBuilderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PathBuilderService]
    });
  });

  it('should ...', inject([PathBuilderService], (service: PathBuilderService) => {
    expect(service).toBeTruthy();
  }));
});
