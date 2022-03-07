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

  consultarUsuarios(userId: number): Observable<UsuarioInterfaz[]> {
    const url = environment.url + '/usuario/' + userId
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

  consultarUsuariosPorNombre(userId: number): Observable<UsuarioInterfaz[]> {
    const url = environment.url + '/usuario/' + userId
    return this.httpClient
      .get(url)
      .pipe(
        map(
          (resultadoEnDatos) => resultadoEnDatos as UsuarioInterfaz[]
        )
      )
  }

  crearUsuario() {
    const url = environment.url + '/usuario/'
    this.httpClient
      .get(url)
      .pipe(
        map(
          (resultadoEnDatos) => resultadoEnDatos as UsuarioInterfaz[]
        )
      )
  }

  actualizarUsuario(userId: number) {
    const url = environment.url + '/usuario/' + userId
    return this.httpClient
      .get(url)
      .pipe(
        map(
          (resultadoEnDatos) => resultadoEnDatos as UsuarioInterfaz[]
        )
      )
  }

  consultarPosts(userId: number): Observable<PostInterfaz[]> {
    const url = environment.url + '/usuario/' + userId
    return this.httpClient
      .get(url)
      .pipe(
        map(
          (resultadoEnDatos) => resultadoEnDatos as PostInterfaz[]
        )
      )
  }

  consultarPostsPorUsuarioId(userId: number): Observable<PostInterfaz[]> {
    const url = environment.url + '/usuario/' + userId
    return this.httpClient
      .get(url)
      .pipe(
        map(
          (resultadoEnDatos) => resultadoEnDatos as PostInterfaz[]
        )
      )
  }

  crearPost(userId: number) {
    const url = environment.url + '/usuario/' + userId
    return this.httpClient
      .get(url)
      .pipe(
        map(
          (resultadoEnDatos) => resultadoEnDatos as UsuarioInterfaz[]
        )
      )
  }

  consultarComentariosPorPostId(userId: number): Observable<ComentarioInterfaz[]> {
    const url = environment.url + '/usuario/' + userId
    return this.httpClient
      .get(url)
      .pipe(
        map(
          (resultadoEnDatos) => resultadoEnDatos as ComentarioInterfaz[]
        )
      )
  }

  crearComentario(userId: number) {
    const url = environment.url + '/usuario/' + userId
    return this.httpClient
      .get(url)
      .pipe(
        map(
          (resultadoEnDatos) => resultadoEnDatos as UsuarioInterfaz[]
        )
      )
  }

  consultarReaccionesPorPostId(userId: number): Observable<ReaccionInterfaz[]> {
    const url = environment.url + '/usuario/' + userId
    return this.httpClient
      .get(url)
      .pipe(
        map(
          (resultadoEnDatos) => resultadoEnDatos as ReaccionInterfaz[]
        )
      )
  }

  eliminarReaccion(userId: number) {
    const url = environment.url + '/usuario/' + userId
    return this.httpClient
      .get(url)
      .pipe(
        map(
          (resultadoEnDatos) => resultadoEnDatos as UsuarioInterfaz[]
        )
      )
  }

  crearReaccion(userId: number) {
    const url = environment.url + '/usuario/' + userId
    return this.httpClient
      .get(url)
      .pipe(
        map(
          (resultadoEnDatos) => resultadoEnDatos as UsuarioInterfaz[]
        )
      )
  }

  consultarTipoDeReaccion(userId: number): Observable<TipoDeReaccionInterfaz[]> {
    const url = environment.url + '/usuario/' + userId
    return this.httpClient
      .get(url)
      .pipe(
        map(
          (resultadoEnDatos) => resultadoEnDatos as TipoDeReaccionInterfaz[]
        )
      )
  }

  consultarSeguimientodeUsuarioId(userId: number): Observable<SeguimientoInterfaz[]> {
    const url = environment.url + '/usuario/' + userId
    return this.httpClient
      .get(url)
      .pipe(
        map(
          (resultadoEnDatos) => resultadoEnDatos as SeguimientoInterfaz[]
        )
      )
  }

  consultarSeguidoresDeUsuarioId(userId: number): Observable<SeguimientoInterfaz[]> {
    const url = environment.url + '/usuario/' + userId
    return this.httpClient
      .get(url)
      .pipe(
        map(
          (resultadoEnDatos) => resultadoEnDatos as SeguimientoInterfaz[]
        )
      )
  }

  eliminarSeguimiento(userId: number) {
    const url = environment.url + '/usuario/' + userId
    return this.httpClient
      .get(url)
      .pipe(
        map(
          (resultadoEnDatos) => resultadoEnDatos as UsuarioInterfaz[]
        )
      )
  }

  crearSeguimiento(userId: number) {
    const url = environment.url + '/usuario/' + userId
    return this.httpClient
      .get(url)
      .pipe(
        map(
          (resultadoEnDatos) => resultadoEnDatos as UsuarioInterfaz[]
        )
      )
  }

}
