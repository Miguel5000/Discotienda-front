import { TestBed } from '@angular/core/testing';

import { CreadorDiscoServiceService } from './creador-disco-service.service';

describe('CreadorDiscoServiceService', () => {
  let service: CreadorDiscoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreadorDiscoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
