import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUpload } from 'src/app/models/file-upload';
import { FileUploadService } from 'src/app/servicios/firebase/file-upload.service';
import { DbtopsterService } from 'src/app/servicios/html/dbtopster.service';
import { PostInterfaz } from 'src/app/servicios/interfaces/PostInterfaz';
import { UsuarioInterfaz } from 'src/app/servicios/interfaces/UsuarioInterfaz';

@Component({
  selector: 'app-ruta-post',
  templateUrl: './ruta-post.component.html',
  styleUrls: ['./ruta-post.component.scss']
})
export class RutaPostComponent implements OnInit {

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

  post!: FormGroup;
  publicacion?: PostInterfaz;
  mostrarError = false;
  descripcion = '';
  selectedFiles?: FileList;
  currentFileUpload?: FileUpload;
  src: string = "";
  idUsuario: number = 1;

  constructor(
    private uploadService: FileUploadService,
    private readonly dbTopsterService: DbtopsterService,
    private readonly router: Router,
    public readonly activatedRoute: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
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
            /*
            const nombre = parametrosDeRuta['nombreUsuario'];
            this.nombreDeUsuario = nombre as string;
            */
            this.nombreDeUsuario = localStorage.getItem('nombreDeUsuario')+""
            this.obtenerPerfilUsuario()
            this.idUsuario = this.obtenerIdUsuario()
          }
        }
      )
    this.esUsuarioLogueado = (localStorage.getItem('nombreDeUsuario') == this.nombreDeUsuario) ? true : false
  }

  obtenerPerfilUsuario() {
    this.dbTopsterService.consultarUsuariosPorNombre(this.nombreDeUsuario)
      .subscribe({
        next: (datos) => {
          console.log(datos)
          this.usuario = Object.assign({}, datos[0]);
        },
        error: (error) => {
          console.error({ error });
        }
      })
  }

  obtenerIdUsuario():number {
    this.dbTopsterService.consultarUsuariosPorNombre(this.nombreDeUsuario)
      .subscribe({
        next: (datos) => {
          this.idUsuario = datos[0].idUsuario;
        },
        error: (error) => {
          console.error({ error });
        }
      })
    return this.idUsuario
  }

  //Función para enviar
  prepararObjeto() {
    return {
      idPost: 1,
      idUsuario: this.idUsuario,
      foto: this.uploadService.urlRecienteDeSubida,
      descripcion: this.descripcion,
      fecha: this.obtenerFecha.toString()
    }
  }

  obtenerFecha() {
    var f = new Date();
    return document.write(f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear());
  }

  crearPost() {
    const postACrear = this.prepararObjeto();
    const actualizar$ = this.dbTopsterService.crearPost(postACrear);
    actualizar$
      .subscribe({
        next: (datos: any) => {
          const ruta = ['/profile/' + this.nombreDeUsuario];
          this.router.navigate(ruta);
        },
        error: (error: any) => {
          console.error({ error })
        }
      });
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
    this.upload()
  }

  upload(): void {
    const file = this.selectedFiles?.item(0);
    this.selectedFiles = undefined;
    this.currentFileUpload = new FileUpload(file!);
    this.src = this.uploadService.pushFileToStorage(this.currentFileUpload)
  }

}
