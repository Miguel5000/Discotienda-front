import { TestBed } from '@angular/core/testing';

import { CompraCancionService } from './compra-cancion.service';

describe('CompraCancionService', () => {
  let service: CompraCancionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompraCancionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
