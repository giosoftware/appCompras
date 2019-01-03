import { Component, OnInit, Input } from '@angular/core';
import { Archivo } from '../../upload/file.model';
import { LoadfileService } from '../../servicios/loadfile.service';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit {

  @Input() upload: Archivo;

  constructor(private loadfileService: LoadfileService) { }
  
  deleteUpload(upload) {
    this.loadfileService.deleteUpload(this.upload);
  }

  ngOnInit() {
  }

}
