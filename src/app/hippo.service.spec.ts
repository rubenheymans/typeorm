import { TestBed } from '@angular/core/testing';

import { HippoService } from './hippo.service';

describe('HippoService', () => {
  let service: HippoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HippoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
