import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  provURL = 'https://comprasapp-a2363.firebaseio.com/proveedores.json';
  proURL = 'https://comprasapp-a2363.firebaseio.com/proveedores';

  constructor(private http: Http) { }

  delProveedor(id$: string) {
    const url = `${this.proURL}/${id$}.json`; return this.http.delete(url)
      .pipe(map(res => res.json()));
  }

  getProveedor(id$: string) {
    const url = `${this.proURL}/${id$}.json`;
    return this.http.get(url)
      .pipe(map(res => res.json()));
  }

  getProveedores() {
    return this.http.get(this.provURL).pipe(map(res => res.json()));
  }

  getProveedoresSearch(busqueda: string) {
    const url = `${this.provURL}?orderBy="nombre"&startAt="${busqueda}"&endAt="${busqueda}\uf8ff"`;
    return this.http.get(url).pipe(map(res => res.json()));
  }

  postProveedor(proveedor: any) {
    const newpres = JSON.stringify(proveedor);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    console.debug(newpres);
    return this.http.post(this.provURL, newpres, { headers })
      .pipe(map(res => {
        console.log(res.json());
        return res.json();
      }))
  }

  putProveedor(proveedor: any, id$: string) {
    const newpre = JSON.stringify(proveedor); const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const url = `${this.proURL}/${id$}.json`;
    return this.http.put(url, newpre, { headers })
      .pipe(map(res => {
        console.log(res.json()); return res.json();
      }))
  }

}
