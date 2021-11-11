import { TestBed } from '@angular/core/testing';

import { ArtistaServiceService } from './artista-service.service';

describe('ArtistaServiceService', () => {
  let service: ArtistaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArtistaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
