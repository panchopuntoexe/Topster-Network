import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DbtopsterService } from 'src/app/servicios/html/dbtopster.service';
import { ComentarioInterfaz } from 'src/app/servicios/interfaces/ComentarioInterfaz';
import { PostInterfaz } from 'src/app/servicios/interfaces/PostInterfaz';
import { SeguimientoInterfaz } from 'src/app/servicios/interfaces/SeguimientoInterfaz';
import { UsuarioInterfaz } from 'src/app/servicios/interfaces/UsuarioInterfaz';

@Component({
  selector: 'app-ruta-profile',
  templateUrl: './ruta-profile.component.html',
  styleUrls: ['./ruta-profile.component.scss']
})
export class RutaProfileComponent implements OnInit {

  nombreDeUsuario: string = ""
  postsDeUsuario:{
    posts:PostInterfaz[],
    usuarios:UsuarioInterfaz[],
    comentarios:ComentarioInterfaz[][],
    reacciones: string[][]
  }={
      posts:[],
      usuarios:[],
      comentarios:[],
      reacciones:[]
    }

  esUsuarioLogueado: Boolean = false;

  textoDeSeguir: String = "Seguir";
  estaSiguiendo: Boolean = false;

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
          }
        }
      )
    this.esUsuarioLogueado = (localStorage.getItem('nombreDeUsuario') == this.nombreDeUsuario) ? true : false
    this.obtenerUsuarioLogueado()
    this.verificarSeguimiento()
  }

  verificarSeguimiento() {
    this.dbTopsterService.consultarSeguimientodeUsuarioId(this.usuarioLogueado.idUsuario)
      .subscribe({
        next: (datos) => {
          if (datos != null) {
            datos.forEach(value => {
              if (this.usuario.idUsuario == value.idUsuarioSeguidor) {
                this.estaSiguiendo = true
              }
            })
          }
          this.estaSiguiendo ? this.textoDeSeguir = "Dejar de seguir" : this.textoDeSeguir = "Seguir"
        },
        error: (error) => {
          console.error({ error });
        }
      })
  }



  seguirUsuario() {
    if (this.estaSiguiendo) {
      this.dbTopsterService.consultarSeguimientodeUsuarioId(this.usuarioLogueado.idUsuario)
      .subscribe({
        next: (datos) => {
          if (datos != null) {
            datos.forEach(value => {
              if (this.usuario.idUsuario == value.idUsuarioSeguidor) {
                this.dbTopsterService.eliminarSeguimiento(value.idSeguimiento)
                  .subscribe({
                    next: (datos) => {
                      this.estaSiguiendo=false
                      this.verificarSeguimiento()
                    },
                    error: (error) => {
                      console.error({ error });
                    }
                  })
              }
            })
          }
        },
        error: (error) => {
          console.error({ error });
        }
      })
      
    }
    else {
      var nuevoSeguimiento: SeguimientoInterfaz = {
        idSeguimiento: 1,
        idUsuarioASeguir: this.usuario.idUsuario,
        idUsuarioSeguidor: this.usuarioLogueado.idUsuario,
        fechaRelacion: ""
      }

      this.dbTopsterService.crearSeguimiento(nuevoSeguimiento)
        .subscribe({
          next: (datos) => {
            this.verificarSeguimiento()
          },
          error: (error) => {
            console.error({ error });
          }
        })
    }
  }


  obtenerPosts() {
    //Se cargan los post realizados por el usuario
    this.dbTopsterService.consultarPostsPorUsuarioId(this.usuario.idUsuario)
      .subscribe({
        next: (datos) => {
          this.postsDeUsuario.posts = Object.assign([], datos);
          this.getUsuariosDePosts()
        },
        error: (error) => {
          console.error({ error });
        }
      })
  }

  obtenerPerfilUsuario() {
    this.dbTopsterService.consultarUsuariosPorNombre(this.nombreDeUsuario)
      .subscribe({
        next: (datos) => {
          this.usuario = Object.assign({}, datos[0]);
          this.obtenerPosts()
        },
        error: (error) => {
          console.error({ error });
        }
      })
  }

  obtenerUsuarioLogueado() {
    var nombreDeUsuarioLogueado: string = ""
    nombreDeUsuarioLogueado = localStorage.getItem('nombreDeUsuario') + ""

    this.dbTopsterService.consultarUsuariosPorNombre(nombreDeUsuarioLogueado)
      .subscribe({
        next: (datos) => {
          this.usuarioLogueado = Object.assign({}, datos[0]);
        },
        error: (error) => {
          console.error({ error });
        }
      })
  }

  editarPerfil() {
    //Solo redirecciona a editar perfil del usuario
    const ruta = ['/edit/' + this.nombreDeUsuario];
    this.router.navigate(ruta);
  }

  getUsuariosDePosts(){
    let aux : PostInterfaz[]=Object.assign([],this.postsDeUsuario.posts)
    aux.forEach(values=>{
      this.dbTopsterService.consultarUsuariosPorId(values.idUsuario)
      .subscribe({
        next: (datos) => {
          this.postsDeUsuario.usuarios.push(datos[0]);
          this.getComentariosDePosts()
        },
        error: (error) => {
          console.error({ error });
        }
      })
    })
    
  }

  getComentariosDePosts(){
    let aux : PostInterfaz[]=Object.assign([],this.postsDeUsuario.posts)
    aux.forEach(values=>{
      this.dbTopsterService.consultarComentariosPorPostId(values.idPost)
      .subscribe({
        next: (datos) => {
          this.postsDeUsuario.comentarios.push(datos);
        },
        error: (error) => {
          console.error({ error });
        }
      })
    })
    
  }

}
