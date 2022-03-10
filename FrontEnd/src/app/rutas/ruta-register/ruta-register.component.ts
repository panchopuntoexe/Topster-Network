import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  formGroup?: FormGroup;
  usuario?: UsuarioInterfaz;

  constructor(
    private readonly dbTopsterService: DbtopsterService,    
    private readonly activatedRoute: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
    this.prepararFormulario();
  }

  crearUsuario() {
    const usuarioACrear = this.prepararObjeto();
    const actualizar$ = this.dbTopsterService
      .crearUsuario(
        usuarioACrear
      );
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
