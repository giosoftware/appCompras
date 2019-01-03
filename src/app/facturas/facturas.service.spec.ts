import { TestBed, inject } from '@angular/core/testing';

import { FacturasService } from './facturas.service';

describe('FacturasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FacturasService]
    });
  });

  it('should be created', inject([FacturasService], (service: FacturasService) => {
    expect(service).toBeTruthy();
  }));
});
