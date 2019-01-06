import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AutenticacionService } from '../../servicios/autenticacion.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  registroForm: FormGroup;
  userdata: any;
  erroresForm = {
    email: '',
    password: ''
  };

  mensajesValidacion = {
    email: {
      required: 'Email obligatorio',
      email: 'Introduzca una dirección email correcta'
    },
    password: {
      required: 'Contraseña obligatoria',
      pattern: 'La contraseña debe tener al menos una letra y un número ',
      minlength: 'y más de 6 caracteres'
    }
  };

  errorOnSubmit = '';

  constructor(
    private formBuilder: FormBuilder,
    private autService: AutenticacionService,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) {}

  ngOnInit() {
    this.registroForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
          Validators.minLength(6)
        ]
      ]
    });
    this.registroForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  async onSubmit() {
    try {
      this.userdata = this.saveUserdata();
      await this.autService.registroUsuario(this.userdata);
      this.router.navigate(['/inicio']);
    } catch (err) {
      this.errorOnSubmit = err.message;
    }
  }

  onValueChanged(data?: any) {
    if (!this.registroForm) {
      return;
    }
    this.errorOnSubmit = '';
    const form = this.registroForm;

    for (const field of Object.keys(this.erroresForm)) {
       this.erroresForm[field] = '';
       const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.mensajesValidacion[field];
        for (const key of Object.keys(control.errors)) {
          this.erroresForm[field] += messages[key] + ' ';
        }
      }
    }
  }

  saveUserdata() {
    const saveUserdata = {
      email: this.registroForm.get('email').value,
      password: this.registroForm.get('password').value
    };
    return saveUserdata;
  }
}
