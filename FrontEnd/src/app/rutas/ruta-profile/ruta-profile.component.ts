import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DbtopsterService } from 'src/app/servicios/html/dbtopster.service';
import { UsuarioInterfaz } from 'src/app/servicios/interfaces/UsuarioInterfaz';

@Component({
  selector: 'app-ruta-profile',
  templateUrl: './ruta-profile.component.html',
  styleUrls: ['./ruta-profile.component.scss']
})
export class RutaProfileComponent implements OnInit {

  nombreDeUsuario:string=""
  usuario?:UsuarioInterfaz

  constructor(
    private readonly dbTopsterService: DbtopsterService,
    private readonly router: Router,
    public readonly activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute
      .params
      .subscribe(
        {
          next: (parametrosDeRuta) => {
            const nombre = parametrosDeRuta['nombreUsuario'];
            this.nombreDeUsuario = nombre;
            this.obtenerPerfilUsuario()
          }
        }
      )
  }

  seguirUsuario(){
    //Añadir un Usuario más a la lista de seguidos
  }

  obtenerPosts(){
    //Se cargan los post realizados por el usuario
  }

  obtenerPerfilUsuario(){
    this.dbTopsterService.consultarUsuariosPorNombre(this.nombreDeUsuario).subscribe({
      next: (datos) => {
        this.usuario = datos[0];
      },
      error: (error) => {
        console.error({error});
      }
    })
  }

  editarPerfil(){
    //Solo redirecciona a editar perfil del usuario
    const ruta = ['/edit/nombreUsuario'];
    this.router.navigate(ruta);
  }

}
