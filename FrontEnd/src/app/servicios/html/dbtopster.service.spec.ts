import { TestBed } from '@angular/core/testing';

import { DbtopsterService } from './dbtopster.service';

describe('DbtopsterService', () => {
  let service: DbtopsterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbtopsterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
