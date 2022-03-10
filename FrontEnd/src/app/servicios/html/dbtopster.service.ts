import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ComentarioInterfaz } from '../interfaces/ComentarioInterfaz';
import { PostInterfaz } from '../interfaces/PostInterfaz';
import { ReaccionInterfaz } from '../interfaces/ReaccionInterfaz';
import { SeguimientoInterfaz } from '../interfaces/SeguimientoInterfaz';
import { TipoDeReaccionInterfaz } from '../interfaces/TipoDeReaccionInterfaz';
import { UsuarioInterfaz } from '../interfaces/UsuarioInterfaz';

@Injectable({
  providedIn: 'any'
})
export class DbtopsterService {

  constructor(
    private readonly httpClient: HttpClient,
    private readonly router: Router,
  ) { }

  consultarUsuarios(): Observable<UsuarioInterfaz[]> {
    const url = environment.url + '/usuarios'
    return this.httpClient
      .get(url)
      .pipe(
        map(
          (resultadoEnDatos) => resultadoEnDatos as UsuarioInterfaz[]
        )
      )
  }

  consultarUsuariosPorId(userId: number): Observable<UsuarioInterfaz[]> {
    const url = environment.url + '/usuario/' + userId
    return this.httpClient
      .get(url)
      .pipe(
        map(
          (resultadoEnDatos) => resultadoEnDatos as UsuarioInterfaz[]
        )
      )
  }

  
  consultarUsuariosPorNombre(nombreDeUsuario: string): Observable<UsuarioInterfaz[]> {
    const url = environment.url + '/usuarios/' + nombreDeUsuario
    return this.httpClient
      .get(url)
      .pipe(
        map(
          (resultadoEnDatos) => resultadoEnDatos as UsuarioInterfaz[]
        )
      )
  }

  consultarUsuariosPorCorreo(correo: string): Observable<UsuarioInterfaz[]> {
    const url = environment.url + '/user/' + correo
    return this.httpClient
      .get(url)
      .pipe(
        map(
          (resultadoEnDatos) => resultadoEnDatos as UsuarioInterfaz[]
        )
      )
  }

  crearUsuario(usuario:UsuarioInterfaz) {
    const url = environment.url + '/usuario/'
    this.httpClient
      .post(url,usuario)
      .pipe(
        map(
          (resultadoEnDatos) => resultadoEnDatos as UsuarioInterfaz[]
        )
      )
  }

  actualizarUsuario(usuario:UsuarioInterfaz):Observable<string> {
    const url = environment.url + '/usuario/'
    return this.httpClient
      .put(url,usuario)
      .pipe(
        map(
          (resultadoEnDatos) => resultadoEnDatos as string
        )
      )
  }

  consultarPosts(): Observable<PostInterfaz[]> {
    const url = environment.url + '/post/'
    return this.httpClient
      .get(url)
      .pipe(
        map(
          (resultadoEnDatos) => resultadoEnDatos as PostInterfaz[]
        )
      )
  }

  consultarPostsPorUsuarioId(userId: number): Observable<PostInterfaz[]> {
    const url = environment.url + '/post/' + userId
    return this.httpClient
      .get(url)
      .pipe(
        map(
          (resultadoEnDatos) => resultadoEnDatos as PostInterfaz[]
        )
      )
  }

  crearPost(post:PostInterfaz) {
    const url = environment.url + '/post/'
    return this.httpClient
      .post(url,post)
      .pipe(
        map(
          (resultadoEnDatos) => resultadoEnDatos as PostInterfaz[]
        )
      )
  }

  consultarComentariosPorPostId(postId: number): Observable<ComentarioInterfaz[]> {
    const url = environment.url + '/comentario/' + postId
    return this.httpClient
      .get(url)
      .pipe(
        map(
          (resultadoEnDatos) => resultadoEnDatos as ComentarioInterfaz[]
        )
      )
  }

  crearComentario(comentario:ComentarioInterfaz) {
    const url = environment.url + '/comentario/'
    return this.httpClient
      .post(url,comentario)
      //no regresa nada brah
  }

  consultarReaccionesPorPostId(postId: number): Observable<ReaccionInterfaz[]> {
    const url = environment.url + '/reaccion/' + postId
    return this.httpClient
      .get(url)
      .pipe(
        map(
          (resultadoEnDatos) => resultadoEnDatos as ReaccionInterfaz[]
        )
      )
  }

  eliminarReaccion(reaccionId: number) {
    const url = environment.url + '/reaccion/' + reaccionId
    return this.httpClient
      .delete(url)
  }

  crearReaccion(reaccion: ReaccionInterfaz) {
    const url = environment.url + '/reaccion/'
    return this.httpClient
      .post(url,reaccion)
  }

  consultarTipoDeReaccion(idTipo: number): Observable<TipoDeReaccionInterfaz[]> {
    const url = environment.url + '/tipoDeReaccion/' + idTipo
    return this.httpClient
      .get(url)
      .pipe(
        map(
          (resultadoEnDatos) => resultadoEnDatos as TipoDeReaccionInterfaz[]
        )
      )
  }
  
//quién le sigue al usuario ID_USUARIO?
  consultarSeguimientodeUsuarioId(userId: number): Observable<SeguimientoInterfaz[]> {
    const url = environment.url + '/seguimiento/' + userId
    return this.httpClient
      .get(url)
      .pipe(
        map(
          (resultadoEnDatos) => resultadoEnDatos as SeguimientoInterfaz[]
        )
      )
  }

//a quién sigue de usuario ID
  consultarSeguidoresDeUsuarioId(userId: number): Observable<SeguimientoInterfaz[]> {
    const url = environment.url + '/seguidores/' + userId
    return this.httpClient
      .get(url)
      .pipe(
        map(
          (resultadoEnDatos) => resultadoEnDatos as SeguimientoInterfaz[]
        )
      )
  }

  eliminarSeguimiento(idRelacion: number):Observable<string> {
    const url = environment.url + '/seguimiento/' + idRelacion
    return this.httpClient
      .delete(url)
      .pipe(
        map(
          (resultadoEnDatos) => resultadoEnDatos as string
        )
      )
  }

  crearSeguimiento(seguimiento: SeguimientoInterfaz) {
    const url = environment.url + '/seguimiento/'
    return this.httpClient
      .post(url,seguimiento)
  }

}
