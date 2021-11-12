import { TestBed } from '@angular/core/testing';

import { CreadorDiscoService } from './creador-disco.service';

describe('CreadorDiscoService', () => {
  let service: CreadorDiscoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreadorDiscoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
