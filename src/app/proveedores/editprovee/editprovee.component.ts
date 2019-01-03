import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProveedoresService } from '../../servicios/proveedores.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editprovee',
  templateUrl: './editprovee.component.html',
  styleUrls: ['./editprovee.component.css']
})
export class EditproveeComponent implements OnInit {

  proveedorForm: FormGroup;
  id: string;
  provincias: string[] = [
    'Álava', 'Albacete', 'Alicante', 'Almería', 'Asturias', 'Ávila', 'Badajoz', 'Barcelona', 'Burgos', 'Cáceres', 'Cádiz', 'Cantabria', 'Castellón', 'Ciudad Real', 'Córdoba', 'La Coruña', 'Cuenca', 'Gerona', 'Granada', 'Guadalajara', 'Guipúzcoa', 'Huelva', 'Huesca', 'IslasBaleares', 'Jaén', 'León', 'Lérida', 'Lugo', 'Madrid', 'Málaga', 'Murcia', 'Navarra', 'Orense', 'Palencia', 'Las Palmas', 'Pontevedra', 'La Rioja', 'Salamanca', 'Segovia', 'Sevilla', 'Soria', 'Tarragona', 'Santa Cruz de Tenerife', 'Teruel', 'Toledo', 'Valencia', 'Valladolid', 'Vizcaya', 'Zamora', 'Zaragoza'
  ];

  constructor(
    private pf: FormBuilder,
    private proveedoresService: ProveedoresService,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) {
    this.activatedRouter.params.subscribe(parametros => {
      this.id = parametros['id'];
      this.proveedoresService.getProveedor(this.id)
        .subscribe(proveedor => {
          this.proveedorForm.get('nombre').setValue(proveedor.nombre);
          this.proveedorForm.get('cif').setValue(proveedor.cif);
          this.proveedorForm.get('direccion').setValue(proveedor.direccion);
          this.proveedorForm.get('cp').setValue(proveedor.cp);
          this.proveedorForm.get('localidad').setValue(proveedor.localidad);
          this.proveedorForm.get('provincia').setValue(proveedor.provincia);
          this.proveedorForm.get('telefono').setValue(proveedor.telefono);
          this.proveedorForm.get('email').setValue(proveedor.email);
          this.proveedorForm.get('contacto').setValue(proveedor.contacto);
        })
    });
  }

  ngOnInit() {
    this.proveedorForm = this.pf.group({
      nombre: ['', Validators.required],
      cif: ['', Validators.required],
      direccion: ['', [Validators.required, Validators.minLength(10)]],
      cp: ['', Validators.required],
      localidad: ['', Validators.required],
      provincia:  ['', Validators.required],
      telefono:  ['', Validators.required],
      email:  ['', [Validators.required, Validators.email]],
      contacto:  ['', Validators.required],
    });
  }

  onSubmit() {
    let proveedor: any = this.saveProveedor();
    this.proveedoresService.putProveedor(proveedor, this.id)
      .subscribe(newprov => {
        this.router.navigate(['/proveedores'])
      })
  }

  saveProveedor() {
    const saveProveedor = {
      nombre: this.proveedorForm.get('nombre').value,
      cif: this.proveedorForm.get('cif').value,
      direccion: this.proveedorForm.get('direccion').value,
      cp: this.proveedorForm.get('cp').value,
      localidad: this.proveedorForm.get('localidad').value,
      provincia: this.proveedorForm.get('provincia').value,
      telefono: this.proveedorForm.get('telefono').value,
      email:  this.proveedorForm.get('email').value,
      contacto:  this.proveedorForm.get('contacto').value
    };
    return saveProveedor;
  }

}
