import { TestBed } from '@angular/core/testing';

import { AuthErrorsService } from './auth-errors.service';

describe('AuthErrorsService', () => {
  let service: AuthErrorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthErrorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
