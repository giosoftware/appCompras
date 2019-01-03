import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PresupuestosService {
  presURL = 'https://comprasapp-a2363.firebaseio.com/presupuestos.json';
  preURL = 'https://comprasapp-a2363.firebaseio.com/presupuestos';

  constructor(private http: Http) { }

  delPresupuesto(id$: string) {
    const url = `${this.preURL}/${id$}.json`; return this.http.delete(url)
      .pipe(map(res => res.json()));
  }

  getPresupuesto(id$: string) {
    const url = `${this.preURL}/${id$}.json`;
    return this.http.get(url)
      .pipe(map(res => res.json()));
  }

  getPresupuestos() {
    return this.http.get(this.presURL).pipe(map(res => res.json()));
  }

  postPresupuesto(presupuesto: any) {
    const newpres = JSON.stringify(presupuesto);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    console.debug(newpres);
    return this.http.post(this.presURL, newpres, { headers })
      .pipe(map(res => {
        console.log(res.json());
        return res.json();
      }))
  }

  putPresupuesto(presupuesto: any, id$: string) {
    const newpre = JSON.stringify(presupuesto); const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const url = `${this.preURL}/${id$}.json`;
    return this.http.put(url, newpre, { headers })
      .pipe(map(res => {
        console.log(res.json()); return res.json();
      }))
  }
}
