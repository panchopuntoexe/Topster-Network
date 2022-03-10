import { Component, Input, OnInit } from '@angular/core';
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
  arregloPosts:PostInterfaz[]=[]

  comentariosDePost:ComentarioInterfaz[]=[]

  getUsuario(idUsuario:number):UsuarioInterfaz{
    
    return {
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
  }

  constructor() { }

  ngOnInit(): void {
  }

}
