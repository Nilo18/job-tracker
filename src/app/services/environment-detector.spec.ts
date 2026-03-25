import { TestBed } from '@angular/core/testing';

import { EnvironmentDetector } from './environment-detector';

describe('EnvironmentDetector', () => {
  let service: EnvironmentDetector;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnvironmentDetector);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
