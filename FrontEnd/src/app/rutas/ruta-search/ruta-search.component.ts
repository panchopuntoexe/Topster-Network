import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DbtopsterService } from 'src/app/servicios/html/dbtopster.service';
import { UsuarioInterfaz } from 'src/app/servicios/interfaces/UsuarioInterfaz';

@Component({
  selector: 'app-ruta-search',
  templateUrl: './ruta-search.component.html',
  styleUrls: ['./ruta-search.component.scss']
})
export class RutaSearchComponent implements OnInit {

  formGroup!: FormGroup;
  arregloTarjetas:UsuarioInterfaz[]=[]

  constructor(
    private readonly dbTopsterService: DbtopsterService,
    private readonly router: Router,
    private readonly formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.prepararFormulario()
  }

  buscarUsuario(){
    console.log(this.formGroup?.get('nombreABuscar')?.value)
    this.dbTopsterService.consultarUsuariosPorNombre(this.formGroup?.get('nombreABuscar')?.value)
    .subscribe({
      next: (datos) => {
        this.arregloTarjetas=datos
        console.log(datos)
      },
      error: (error) => {
        console.error({error});
      }
    })
  }

  private prepararFormulario() {
    this.formGroup = this.formBuilder.group({
      nombreABuscar: new FormControl(
        {
          value: '',
          disabled: false
        }
      )

    });

  }


}
