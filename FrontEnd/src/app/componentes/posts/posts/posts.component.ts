import { Component, Input, OnInit } from '@angular/core';
import { DbtopsterService } from 'src/app/servicios/html/dbtopster.service';
import { ComentarioInterfaz } from 'src/app/servicios/interfaces/ComentarioInterfaz';
import { PostInterfaz } from 'src/app/servicios/interfaces/PostInterfaz';
import { ReaccionInterfaz } from 'src/app/servicios/interfaces/ReaccionInterfaz';
import { UsuarioInterfaz } from 'src/app/servicios/interfaces/UsuarioInterfaz';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})


export class PostsComponent implements OnInit {

  @Input()
  arregloPosts: {
    posts: PostInterfaz[],
    usuarios: UsuarioInterfaz[],
    comentarios: ComentarioInterfaz[][],
    reacciones: string[][]
  } = {
      posts: [],
      usuarios: [{
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
      }],
      comentarios: [],
      reacciones:[]
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



  objectKeys(objeto: any) {
    const keys = Object.keys(objeto);
    return keys;
  }


  arregloUsuariosDePosts: UsuarioInterfaz[] = [{
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
  }, {
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
  }]


  reaccionar(idTipoDeReaccion: number, idPost: number) {
    this.dbTopsterService.consultarReaccionesPorPostId(idPost)
      .subscribe({
        next: (datos) => {
          //verificar que exista la reacción
          var existeReaccion: boolean = false
          var idReaccion:number=0
          datos.forEach(values => {
            if (values.idTipoDeReaccion == idTipoDeReaccion) {
              console.log(values.idTipoDeReaccion )
              existeReaccion = true
              //eliminoReaccion
              this.dbTopsterService.eliminarReaccion(values.idTipoDeReaccion)
              .subscribe()
              this.arregloPosts.reacciones[0].push("")
              this.arregloPosts.reacciones[0].pop()
            }
          })
          //creo reaccion
          if(!existeReaccion){
            var nuevaReaccion: ReaccionInterfaz = {
              idReaccion: 0,
              idTipoDeReaccion: idTipoDeReaccion,
              idPost: idPost,
              idUsuario: this.usuarioLogueado.idUsuario
            }
            this.dbTopsterService.crearReaccion(nuevaReaccion)
              .subscribe()

            this.arregloPosts.reacciones[0].push("")
            this.arregloPosts.reacciones[0].pop()
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
        },
        error: (error) => {
          console.error({ error });
        }
      })
  }


  constructor(
    private readonly dbTopsterService: DbtopsterService
  ) {
    this.obtenerUsuarioLogueado()
  }


  ngOnInit(): void {
    console.log("posts", this.arregloPosts.posts)
  }


}
