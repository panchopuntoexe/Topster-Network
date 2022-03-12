import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DbtopsterService } from 'src/app/servicios/html/dbtopster.service';
import { ComentarioInterfaz } from 'src/app/servicios/interfaces/ComentarioInterfaz';
import { PostInterfaz } from 'src/app/servicios/interfaces/PostInterfaz';
import { UsuarioInterfaz } from 'src/app/servicios/interfaces/UsuarioInterfaz';

@Component({
  selector: 'app-ruta-home',
  templateUrl: './ruta-home.component.html',
  styleUrls: ['./ruta-home.component.scss']
})
export class RutaHomeComponent implements OnInit {

  nombreDeUsuario: string = "";
  esUsuarioLogueado: Boolean = false;
  
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

  postsDeUsuario: {
    posts: PostInterfaz[],
    usuarios: UsuarioInterfaz[],
    comentarios: ComentarioInterfaz[][],
    reacciones: string[][]
  } = {
      posts: [],
      usuarios: [],
      comentarios: [],
      reacciones:[]
    };

  estaSiguiendo: Boolean = false;
  textoDeSeguir: String = "Seguir";
  arregloSeguidores: number[] = [];
  arregloPosts: PostInterfaz[] = [];
  idUsuario: number = 1;

  constructor(
    private readonly dbTopsterService: DbtopsterService,
    private readonly router: Router,
    public readonly activatedRoute: ActivatedRoute
  ) {
  }

  posts = {}

  ngOnInit(): void {
    this.activatedRoute
      .params
      .subscribe(
        {
          next: (parametrosDeRuta) => {
            //no hace nada porque le quite la ruta
            /*
            const nombre = parametrosDeRuta['nombreUsuario'];
            this.nombreDeUsuario = nombre as string;
            */
            this.obtenerUsuarioLogueado()
          }
        }
      )
    this.esUsuarioLogueado = (localStorage.getItem('nombreDeUsuario') == this.nombreDeUsuario) ? true : false
    this.obtenerUsuarioLogueado()
  }

  obtenerPostsDeFeed() {
    this.dbTopsterService.consultarSeguimientodeUsuarioId(this.usuarioLogueado.idUsuario)
      .subscribe({
        next: (datos) => {
          if (datos != null) {
            datos.forEach(value => {
              this.dbTopsterService.consultarPostsPorUsuarioId(value.idUsuarioSeguidor)
                .subscribe({
                  next: (datos) => {
                    this.postsDeUsuario.posts = Object.assign([], datos);
                    this.getUsuariosDePosts()
                  },
                  error: (error) => {
                    console.error({ error });
                  }
                })
            })
          }
          
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
          this.obtenerPostsDeFeed()
        },
        error: (error) => {
          console.error({ error });
        }
      })
  }

  getUsuariosDePosts() {
    let aux: PostInterfaz[] = Object.assign([], this.postsDeUsuario.posts)
    aux.forEach(values => {
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

  getComentariosDePosts() {
    let aux: PostInterfaz[] = Object.assign([], this.postsDeUsuario.posts)
    aux.forEach(values => {
      this.dbTopsterService.consultarComentariosPorPostId(values.idPost)
        .subscribe({
          next: (datos) => {
            this.postsDeUsuario.comentarios.push(datos);
            this.getReaccionesDePosts()
          },
          error: (error) => {
            console.error({ error });
          }
        })
    })

  }

  getReaccionesDePosts() {
    let aux: PostInterfaz[] = Object.assign([], this.postsDeUsuario.posts)
    aux.forEach(values => {
      this.dbTopsterService.consultarReaccionesPorPostId(values.idPost)
        .subscribe({
          next: (datos) => {
            var auxReacciones:string[] = ["currentColor","currentColor","currentColor","currentColor","currentColor"]
            datos.forEach((value,index)=>{
              auxReacciones[value.idTipoDeReaccion] = "red"
            })
            this.postsDeUsuario.reacciones.push(auxReacciones);
          },
          error: (error) => {
            console.error({ error });
          }
        })
    })

  }

}
