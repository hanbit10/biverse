import { TestBed } from '@angular/core/testing';

import { VerseService } from './verse.service';

describe('VerseService', () => {
  let service: VerseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
