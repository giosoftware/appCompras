import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FacturasService {

  factURL = 'https://comprasapp-a2363.firebaseio.com/facturas.json';
  facURL = 'https://comprasapp-a2363.firebaseio.com/facturas';

  constructor(private http: Http) { }

  delFactura(id$: string) {
    const url = `${this.facURL}/${id$}.json`; return this.http.delete(url)
      .pipe(map(res => res.json()));
  }

  getFactura(id$: string) {
    const url = `${this.facURL}/${id$}.json`;
    return this.http.get(url)
      .pipe(map(res => res.json()));
  }

  getFacturas() {
    return this.http.get(this.factURL).pipe(map(res => res.json()));
  }

  postFactura(Factura: any) {
    const newfact = JSON.stringify(Factura);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    console.debug(newfact);
    return this.http.post(this.factURL, newfact, { headers })
      .pipe(map(res => {
        console.log(res.json());
        return res.json();
      }))
  }

  putFactura(Factura: any, id$: string) {
    const newpre = JSON.stringify(Factura); const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const url = `${this.facURL}/${id$}.json`;
    return this.http.put(url, newpre, { headers })
      .pipe(map(res => {
        console.log(res.json()); return res.json();
      }))
  }
}
