import { isNull } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DbtopsterService } from 'src/app/servicios/html/dbtopster.service';
import { UsuarioInterfaz } from 'src/app/servicios/interfaces/UsuarioInterfaz';

@Component({
  selector: 'app-ruta-register',
  templateUrl: './ruta-register.component.html',
  styleUrls: ['./ruta-register.component.scss']
})
export class RutaRegisterComponent implements OnInit {

  mostrarError = false;
  registro!: FormGroup;
  usuario?: UsuarioInterfaz;

  constructor(
    private readonly dbTopsterService: DbtopsterService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
    this.prepararFormulario();
  }

  private prepararFormulario() {
    this.registro = this.formBuilder.group({
      nombres: new FormControl({
        value: this.usuario ? this.usuario?.nombres : '',
        disabled: false
      },
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50)
        ]),
      apellidos: new FormControl({
        value: this.usuario ? this.usuario?.apellidos : '',
        disabled: false
      },
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50)
        ]),
      nickname: new FormControl({
        value: this.usuario ? this.usuario?.nickname : '',
        disabled: false
      },
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(25)
        ]),
      correo: new FormControl({
        value: this.usuario ? this.usuario?.correo : '',
        disabled: false
      },
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50)
        ]),
      clave: new FormControl({
        value: this.usuario ? this.usuario?.clave : '',
        disabled: false
      },
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(50)
        ]),
      fechaDeNacimiento: new FormControl({
        value: this.usuario ? this.usuario?.fechaDeNacimiento : '',
        disabled: false
      },
        [
          Validators.required,
          Validators.maxLength(10)
        ]),
      genero: new FormControl({
        value: this.usuario ? this.usuario?.genero : '',
        disabled: false
      },
        [
          Validators.required,
          Validators.maxLength(100)
        ]),
    }
    );

    const cambio$ = this.registro.valueChanges;
    cambio$.subscribe(
      (data) => {
        if (this.registro?.valid) {
          console.log("Valido");
          this.mostrarError = false;
        } else {
          console.log("Invalido");
          this.mostrarError = true;
        }
      }
    );

  }

  //Función para enviar
  prepararObjeto() {
    if (this.registro) {
      return {
        nickname: this.registro?.get('nickname')?.value,
        apellidos: this.registro?.get('apellidos')?.value,
        nombres: this.registro?.get('nombres')?.value,
        correo: this.registro?.get('correo')?.value,
        clave: this.registro.get('clave')?.value,
        fechaDeNacimiento: this.registro?.get('fechaDeNacimiento')?.value,
        genero: this.registro.get('genero')?.value,
        idUsuario: 1,
        fotoDePerfil: 'https://www.nicepng.com/png/detail/202-2022264_usuario-annimo-usuario-annimo-user-icon-png-transparent.png',
        biografia: 'Soy nuevo en Topster...',
      }
    }
    return {
      idUsuario: 1,
      fotoDePerfil: '',
      biografia: '',
      nickname: '',
      apellidos: '',
      nombres: '',
      correo: '',
      clave: '',
      fechaDeNacimiento: '',
      genero: ''
    }
  }

  crearUsuario() {
    const usuarioACrear = this.prepararObjeto();
    const actualizar$ = this.dbTopsterService.crearUsuario(usuarioACrear);
    actualizar$
      .subscribe({
        next: (datos: any) => {
          console.log(datos)
          const ruta = ['/login'];
          this.router.navigate(ruta);
        },
        error: (error: any) => {
          console.error({ error })
        }
      });
  }

}
