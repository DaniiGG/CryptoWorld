import { TestBed } from '@angular/core/testing';

import { PeticionesAjaxService } from './peticiones-ajax.service';

describe('PeticionesAjaxService', () => {
  let service: PeticionesAjaxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeticionesAjaxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
