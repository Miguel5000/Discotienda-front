import { TestBed } from '@angular/core/testing';

import { CompraDiscoServiceService } from './compra-disco-service.service';

describe('CompraDiscoServiceService', () => {
  let service: CompraDiscoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompraDiscoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
