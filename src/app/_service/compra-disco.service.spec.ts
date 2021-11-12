import { TestBed } from '@angular/core/testing';

import { CompraDiscoService } from './compra-disco.service';

describe('CompraDiscoService', () => {
  let service: CompraDiscoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompraDiscoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
