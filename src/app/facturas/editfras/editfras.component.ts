import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FacturasService } from '../facturas.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editfras',
  templateUrl: './editfras.component.html',
  styleUrls: ['./editfras.component.css']
})
export class EditfrasComponent implements OnInit {

  facturaForm: FormGroup;
  proveedor: any;
  id: string;

  constructor(
    private pf: FormBuilder,
    private facturaService: FacturasService,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) {
    this.activatedRouter.params.subscribe(parametros => {
      this.id = parametros['id'];
      this.facturaService.getFactura(this.id)
        .subscribe(factura => {
          this.facturaForm.get('proveedor').setValue(factura.proveedor);
          this.facturaForm.get('fecha').setValue(factura.fecha);
          this.facturaForm.get('concepto').setValue(factura.concepto);
          this.facturaForm.get('base').setValue(factura.base);
          this.facturaForm.get('tipo').setValue(factura.tipo);
          this.facturaForm.get('iva').setValue(factura.iva);
          this.facturaForm.get('total').setValue(factura.total);
        })
    });
  }

  ngOnInit() {
    this.facturaForm = this.pf.group({
      proveedor: ['', Validators.required],
      fecha: ['', Validators.required],
      concepto: ['', [Validators.required, Validators.minLength(10)]],
      base: ['', Validators.required],
      tipo: ['', Validators.required],
      iva: {disabled: true},
      total: {disabled: true},
    });

    this.onChanges();
  }

  onChanges(): void {
    this.facturaForm.controls.base.valueChanges.subscribe(base => {
      this.facturaForm.get('iva').setValue(base * this.facturaForm.value.tipo);
      this.facturaForm.get('total').setValue(base + (base * this.facturaForm.value.tipo));
    });
    this.facturaForm.controls.tipo.valueChanges.subscribe(tipo => {
      this.facturaForm.get('iva').setValue(this.facturaForm.value.base * tipo);
      this.facturaForm.get('total').setValue(this.facturaForm.value.base + (this.facturaForm.value.base * tipo));
    });
  }

  onSubmit() {
    let factura = this.saveFactura(); 
    this.facturaService.putFactura(factura, this.id)
      .subscribe(newfac => {
        this.router.navigate(['/facturas'])
      })
  }

  saveFactura() {
    const saveFactura = {
      proveedor: this.facturaForm.get('proveedor').value, 
      fecha: this.facturaForm.get('fecha').value, 
      concepto: this.facturaForm.get('concepto').value, 
      base: this.facturaForm.get('base').value,
      tipo: this.facturaForm.get('tipo').value, 
      iva: this.facturaForm.get('iva').value, 
      total: this.facturaForm.get('total').value
    };

    return saveFactura;
  }

}
