import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DbtopsterService } from 'src/app/servicios/html/dbtopster.service';
import { UsuarioInterfaz } from 'src/app/servicios/interfaces/UsuarioInterfaz';

@Component({
  selector: 'app-ruta-home',
  templateUrl: './ruta-home.component.html',
  styleUrls: ['./ruta-home.component.scss']
})
export class RutaHomeComponent implements OnInit {

  nombreDeUsuario: string = "";
  esUsuarioLogueado: Boolean = false;
  usuario: UsuarioInterfaz = {
    idUsuario: 1,
    nickname: "nickname",
    biografia: "biografia",
    apellidos: "apellidos",
    nombres: "nombres",
    correo: "correo",
    clave: "clave",
    fechaDeNacimiento: "06/07/1999",
    genero: "Hombre",
    fotoDePerfil: ""
  }

  usuarioLogueado: UsuarioInterfaz = {
    idUsuario: 1,
    nickname: "nickname",
    biografia: "biografia",
    apellidos: "apellidos",
    nombres: "nombres",
    correo: "correo",
    clave: "clave",
    fechaDeNacimiento: "06/07/1999",
    genero: "Hombre",
    fotoDePerfil: ""
  };

  constructor(
    private readonly dbTopsterService: DbtopsterService,
    private readonly router: Router,
    public readonly activatedRoute: ActivatedRoute
  ) { 
    console.log(localStorage.getItem('nombreDeUsuario'))
  }

  posts={}

  ngOnInit(): void {
    this.activatedRoute
      .params
      .subscribe(
        {
          next: (parametrosDeRuta) => {
            const nombre = parametrosDeRuta['nombreUsuario'];
            this.nombreDeUsuario = nombre as string;
            this.obtenerPerfilUsuario()
          }
        }
      )
    this.esUsuarioLogueado = (localStorage.getItem('nombreDeUsuario') == this.nombreDeUsuario) ? true : false
  }

  obtenerPerfilUsuario() {
    this.dbTopsterService.consultarUsuariosPorNombre(this.nombreDeUsuario)
      .subscribe({
        next: (datos) => {
          this.usuario = Object.assign({}, datos[0]);
        },
        error: (error) => {
          console.error({ error });
        }
      })
  }

  consultarPosts(){
    //TODO consultar seguidos y consultar posts de estos-> lleno a posts{}
  }

  


}
