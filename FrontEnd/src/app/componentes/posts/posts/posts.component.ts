import { Component, Input, OnInit } from '@angular/core';
import { DbtopsterService } from 'src/app/servicios/html/dbtopster.service';
import { ComentarioInterfaz } from 'src/app/servicios/interfaces/ComentarioInterfaz';
import { PostInterfaz } from 'src/app/servicios/interfaces/PostInterfaz';
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
    comentarios: ComentarioInterfaz[][]
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
      comentarios: []
    }

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





  constructor(
    private readonly dbTopsterService: DbtopsterService
  ) {
  }
  

  ngOnInit(): void {
    console.log("posts", this.arregloPosts.posts)
  }


}
