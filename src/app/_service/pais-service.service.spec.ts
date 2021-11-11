import { TestBed } from '@angular/core/testing';

import { PaisServiceService } from './pais-service.service';

describe('PaisServiceService', () => {
  let service: PaisServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaisServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
