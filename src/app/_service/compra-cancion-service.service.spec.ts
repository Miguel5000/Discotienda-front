import { TestBed } from '@angular/core/testing';

import { CompraCancionServiceService } from './compra-cancion-service.service';

describe('CompraCancionServiceService', () => {
  let service: CompraCancionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompraCancionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
