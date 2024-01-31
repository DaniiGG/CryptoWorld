import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { segundoguardGuard } from './segundoguard.guard';

describe('segundoguardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => segundoguardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
