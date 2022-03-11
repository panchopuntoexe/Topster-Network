import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DbtopsterService } from 'src/app/servicios/html/dbtopster.service';
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

  postsDeUsuario: PostInterfaz[] = [];
  estaSiguiendo: Boolean = false;
  textoDeSeguir: String = "Seguir";
  arregloSeguidores: number[] = [];
  arregloPosts: number[] = [];
  idUsuario: number = 1;

  constructor(
    private readonly dbTopsterService: DbtopsterService,
    private readonly router: Router,
    public readonly activatedRoute: ActivatedRoute
  ) {
    console.log(localStorage.getItem('nombreDeUsuario'))
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
            this.obtenerPerfilUsuario()
          }
        }
      )
    this.esUsuarioLogueado = (localStorage.getItem('nombreDeUsuario') == this.nombreDeUsuario) ? true : false
    this.obtenerUsuarioLogueado()
    this.obtenerPosts()
    this.obtenerPostsDeSeguidos()
  }

  obtenerPosts() {
    //Se cargan los post realizados por el usuario
    this.dbTopsterService.consultarPostsPorUsuarioId(this.usuario.idUsuario)
      .subscribe({
        next: (datos) => {
          this.postsDeUsuario = Object.assign(this.postsDeUsuario, datos);
        },
        error: (error) => {
          console.error({ error });
        }
      })
  }

  obtenerPerfilUsuario() {
    this.dbTopsterService.consultarUsuariosPorNombre(this.usuarioLogueado.nickname)
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

    // Obteniendo los ids de los seguidores e insertandolos en un arreglo
    obtenerPostsDeSeguidos(){
      this.dbTopsterService.consultarUsuariosPorNombre(this.nombreDeUsuario)
        .subscribe({
          next: (datos) => {
            this.idUsuario = datos[0].idUsuario;

            this.dbTopsterService.consultarSeguimientodeUsuarioId(this.idUsuario)
            .subscribe({
              next: (datos) => {
                  datos.forEach((value, index, datos) => {
                    this.arregloSeguidores.push(datos[index].idUsuarioSeguidor)
                  })

                  //Problema Aquí
                  // Estoy iterando entre los seguidos y obteniendo sus postId
                  // Problema existente porque se generan n número de arreglos según los n seguidos
                  // cada uno con los postId de cada seguido
                  // Lo que dificulta iterar una vez más en un arreglo de posts (porque son n) 
                  this.arregloSeguidores.forEach((value, index, datos) => {
                    this.dbTopsterService.consultarPostsPorUsuarioId(datos[index].valueOf())
                      .subscribe({
                        next: (datos) => {
                          datos.forEach((value, index, datos) => {
                            this.arregloPosts.push(datos[index].idPost)
                          })
                          this.arregloPosts.forEach((value, index, datos) => {
                            this.postsDeUsuario = Object.assign(this.postsDeUsuario, datos[index].valueOf());
                          })
                        },
                        error: (error) => {
                          console.error({ error });
                        }
                      })
                  })

                this.estaSiguiendo ? this.textoDeSeguir = "Dejar de seguir" : this.textoDeSeguir = "Seguir"
              },
              error: (error) => {
                console.error({ error });
              }
            })

          },
          error: (error) => {
            console.error({ error });
          },
        })
    }


  // obtenerPostsDeSeguidos() {
  //   this.arregloSeguidores = this.obtenerSeguidosId();
  //   console.log(this.obtenerSeguidosId())
  //   console.log(this.arregloSeguidores)
  //   // for (var i = 0; i < this.arregloSeguidores.length; i++) {
  //   //   this.dbTopsterService.consultarPostsPorUsuarioId(Object.values(this.arregloSeguidores))
  //   //     .subscribe({
  //   //       next: (datos) => {
  //   //         this.postsDeUsuario = Object.assign(this.postsDeUsuario, datos);
  //   //       },
  //   //       error: (error) => {
  //   //         console.error({ error });
  //   //       }
  //   //     })
  //   // }

  //   // //Se cargan los post de los usuarios a los que sigue 
  //   // for (var i = 0; i < this.arregloSeguidores.length; i++) {
  //   //   console.log(i)
  //   //   this.dbTopsterService.consultarPostsPorUsuarioId(this.arregloSeguidores[i])
  //   //     .subscribe({
  //   //       next: (datos) => {
  //   //         this.postsDeUsuario = Object.assign(this.postsDeUsuario, datos);
  //   //       },
  //   //       error: (error) => {
  //   //         console.error({ error });
  //   //       }
  //   //     })
  //   // }

  //   // this.arregloSeguidores.forEach((value, index, datos) =>{
  //   //   this.dbTopsterService.consultarPostsPorUsuarioId(datos[index].valueOf())
  //   //   .subscribe({
  //   //     next: (datos) => {
  //   //       this.postsDeUsuario = Object.assign(this.postsDeUsuario, datos);
  //   //     },
  //   //     error: (error) => {
  //   //       console.error({ error });
  //   //     }
  //   //   })
  //   // })
  // }
  
  // obtenerSeguidosId() : any {
  //   this.dbTopsterService.consultarUsuariosPorNombre(this.nombreDeUsuario)
  //     .subscribe({
  //       next: (datos) => {
  //         this.idUsuario = datos[0].idUsuario;
  //         this.dbTopsterService.consultarSeguimientodeUsuarioId(this.idUsuario)
  //           .subscribe({
  //             next: (datos) => {
  //               if (datos != null) {
  //                 datos.forEach((value, index, datos) => {
  //                   this.arregloSeguidores.push(datos[index].idUsuarioSeguidor)
  //                 })
  //               }
  //               this.estaSiguiendo ? this.textoDeSeguir = "Dejar de seguir" : this.textoDeSeguir = "Seguir"
  //             },
  //             error: (error) => {
  //               console.error({ error });
  //             }
  //           })
  //       },
  //       error: (error) => {
  //         console.error({ error });
  //       }
  //     })
  //   return [...this.arregloSeguidores]
  // }


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
  
}
