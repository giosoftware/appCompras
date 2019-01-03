import { Component, OnInit } from '@angular/core';
import { AngularFireList } from 'angularfire2/database'; 
import { LoadfileService } from '../servicios/loadfile.service'; 
import { Archivo } from '../upload/file.model';

@Component({
  selector: 'app-contratos',
  templateUrl: './contratos.component.html',
  styleUrls: ['./contratos.component.css']
})
export class ContratosComponent implements OnInit {

  uploads: AngularFireList<Archivo[]>;
  archivos: Archivo[];

  constructor(private loadfileService: LoadfileService) {}

  ngOnInit() {
    this.uploads = this.loadfileService.getUploads();
    //this.loadfileService.getUploads().valueChanges().subscribe(data => this.uploads);
    
  }

}
