import { FacturasModule } from './facturas.module';

describe('FacturasModule', () => {
  let facturasModule: FacturasModule;

  beforeEach(() => {
    facturasModule = new FacturasModule();
  });

  it('should create an instance', () => {
    expect(facturasModule).toBeTruthy();
  });
});
