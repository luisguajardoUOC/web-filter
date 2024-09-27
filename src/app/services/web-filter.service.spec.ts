import { TestBed } from '@angular/core/testing';

import { WebFilterService } from './web-filter.service';

describe('WebFilterService', () => {
  let service: WebFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
