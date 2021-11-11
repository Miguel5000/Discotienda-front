import { TestBed } from '@angular/core/testing';

import { DiscoServiceService } from './disco-service.service';

describe('DiscoServiceService', () => {
  let service: DiscoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiscoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
