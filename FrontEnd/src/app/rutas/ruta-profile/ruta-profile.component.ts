import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbtopsterService } from 'src/app/servicios/html/dbtopster.service';

@Component({
  selector: 'app-ruta-profile',
  templateUrl: './ruta-profile.component.html',
  styleUrls: ['./ruta-profile.component.scss']
})
export class RutaProfileComponent implements OnInit {

  constructor(
    private readonly dbTopsterService: DbtopsterService,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
  }

  seguirUsuario(){
    //Añadir un Usuario más a la lista de seguidos
  }

  obtenerPosts(){
    //Se cargan los post realizados por el usuario
  }

  obtenerPerfilUsuario(){
    //Obtener los datos del usuario
  }

  editarPerfil(){
    //Solo redirecciona a editar perfil del usuario
    const ruta = ['/edit/nombreUsuario'];
    this.router.navigate(ruta);
  }

}
