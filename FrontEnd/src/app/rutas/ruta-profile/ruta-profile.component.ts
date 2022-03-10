import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DbtopsterService } from 'src/app/servicios/html/dbtopster.service';
import { PostInterfaz } from 'src/app/servicios/interfaces/PostInterfaz';
import { UsuarioInterfaz } from 'src/app/servicios/interfaces/UsuarioInterfaz';

@Component({
  selector: 'app-ruta-profile',
  templateUrl: './ruta-profile.component.html',
  styleUrls: ['./ruta-profile.component.scss']
})
export class RutaProfileComponent implements OnInit {

  nombreDeUsuario:string=""
  postsDeUsuario:PostInterfaz[]=[]
  esUsuarioLogueado:Boolean=false;
  
  usuario:UsuarioInterfaz = {
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
            this.nombreDeUsuario = nombre as string;
            this.obtenerPerfilUsuario()
            this.obtenerPosts()
          }
        }
      )

    this.esUsuarioLogueado = (localStorage.getItem('nombreDeUsuario')==this.nombreDeUsuario) ? true:false
  }

  seguirUsuario(){
    //Añadir un Usuario más a la lista de seguidos

  }

  obtenerPosts(){
    //Se cargan los post realizados por el usuario
    this.dbTopsterService.consultarPostsPorUsuarioId(this.usuario.idUsuario)
    .subscribe({
      next: (datos) => { 
        this.postsDeUsuario = Object.assign(this.postsDeUsuario,datos);
        console.log(this.postsDeUsuario)
      },
      error: (error) => {
        console.error({error});
      }
    })
  }

  obtenerPerfilUsuario(){
    this.dbTopsterService.consultarUsuariosPorNombre(this.nombreDeUsuario)
    .subscribe({
      next: (datos) => { 
        this.usuario = Object.assign({},datos[0]);
      },
      error: (error) => {
        console.error({error});
      }
    })
  }

  editarPerfil(){
    //Solo redirecciona a editar perfil del usuario
    const ruta = ['/edit/'+this.nombreDeUsuario];
    this.router.navigate(ruta);
  }

}
