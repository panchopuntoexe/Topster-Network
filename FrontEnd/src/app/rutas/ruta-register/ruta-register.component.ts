import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbtopsterService } from 'src/app/servicios/html/dbtopster.service';

@Component({
  selector: 'app-ruta-register',
  templateUrl: './ruta-register.component.html',
  styleUrls: ['./ruta-register.component.scss']
})
export class RutaRegisterComponent implements OnInit {

  constructor(
    private readonly dbTopsterService: DbtopsterService,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
  }

  crearUsuario() {
    // const usuarioACrear = this.prepararObjeto();
    // const actualizar$ = this.dbTopsterService
    //   .crearUsuario(
    //     usuarioACrear
    //   );
    // actualizar$
    //   .subscribe({
    //     next: (datos: any) => {
    //       console.log(datos)
          const ruta = ['/login'];
          this.router.navigate(ruta);

    //     },
    //     error: (error: any) => {
    //       console.error({ error })
    //     }
    //   });
  }


}
