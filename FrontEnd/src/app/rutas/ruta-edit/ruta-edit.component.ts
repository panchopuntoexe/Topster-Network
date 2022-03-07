import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbtopsterService } from 'src/app/servicios/html/dbtopster.service';

@Component({
  selector: 'app-ruta-edit',
  templateUrl: './ruta-edit.component.html',
  styleUrls: ['./ruta-edit.component.scss']
})
export class RutaEditComponent implements OnInit {

  constructor(
    private readonly dbTopsterService: DbtopsterService,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
  }

  actualizarPerfil(){
    //Actualiza los datos del usuario
    const ruta = ['/profile/nombreUsuario'];
    this.router.navigate(ruta);
  }

  cargarPerfil(){
    //Solo redirecciona al perfil del usuario
    const ruta = ['/profile/nombreUsuario'];
    this.router.navigate(ruta);
  }
}
