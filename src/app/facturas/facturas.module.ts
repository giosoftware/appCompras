import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { FacturasComponent } from './facturas/facturas.component';
import { AddfrasComponent } from './addfras/addfras.component';
import { FacturasService } from './facturas.service';
import { EditfrasComponent } from './editfras/editfras.component';

const routes: Routes = [
  { path: 'facturas', component: FacturasComponent },
  { path: 'addfras', component: AddfrasComponent },
  { path: 'editfras/:id', component: EditfrasComponent },
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    HttpModule,
  ],
  declarations: [FacturasComponent, AddfrasComponent, EditfrasComponent],
  providers: [FacturasService]
})
export class FacturasModule { }
