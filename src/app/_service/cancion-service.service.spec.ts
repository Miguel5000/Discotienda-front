import { TestBed } from '@angular/core/testing';

import { CancionServiceService } from './cancion-service.service';

describe('CancionServiceService', () => {
  let service: CancionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CancionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
