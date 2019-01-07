import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadfileService } from '../servicios/loadfile.service';
import { Archivo } from '../upload/file.model';

@Component({
  selector: 'app-contratos',
  templateUrl: './contratos.component.html',
  styleUrls: ['./contratos.component.css']
})
export class ContratosComponent implements OnInit {

  uploads: Observable<any[]>;
  archivos: Archivo[];

  constructor(private loadfileService: LoadfileService) {}

  ngOnInit() {
    this.uploads = this.loadfileService.getUploads();
  }

}
