import { TestBed } from '@angular/core/testing';

import { FormatoServiceService } from './formato-service.service';

describe('FormatoServiceService', () => {
  let service: FormatoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormatoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
