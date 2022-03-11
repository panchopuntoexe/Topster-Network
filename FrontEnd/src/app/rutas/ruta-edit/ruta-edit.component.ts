import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUpload } from 'src/app/models/file-upload';
import { FileUploadService } from 'src/app/servicios/firebase/file-upload.service';
import { DbtopsterService } from 'src/app/servicios/html/dbtopster.service';
import { UsuarioInterfaz } from 'src/app/servicios/interfaces/UsuarioInterfaz';

@Component({
  selector: 'app-ruta-edit',
  templateUrl: './ruta-edit.component.html',
  styleUrls: ['./ruta-edit.component.scss']
})
export class RutaEditComponent implements OnInit {

  nombreDeUsuario: string = "";

  formGroup!: FormGroup;

  src:string=""

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

  selectedFiles?: FileList;

  currentFileUpload?: FileUpload;

  percentage: number=0;

  constructor(private uploadService: FileUploadService,
    private readonly dbTopsterService: DbtopsterService,
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
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
  }

  prepararObjeto(){
    this.usuario.nickname = this.formGroup?.get('nombreDeUsuario')?.value
    this.nombreDeUsuario = this.usuario.nickname
    this.usuario.correo = this.formGroup?.get('correo')?.value
    this.usuario.biografia = this.formGroup?.get('biografia')?.value
    this.usuario.nombres = this.formGroup?.get('nombre')?.value
    this.usuario.apellidos = this.formGroup?.get('apellido')?.value
    this.usuario.genero = this.formGroup?.get('genero')?.value
    this.usuario.fotoDePerfil = this.uploadService.urlRecienteDeSubida
  }

  actualizarPerfil() {
    
    this.prepararObjeto()
    this.dbTopsterService.actualizarUsuario(this.usuario)
      .subscribe({
        next: (datos) => {
          this.cargarPerfil()
        },
        error: (error) => {
          console.error({ error });
        }
      })
  }

  cargarPerfil() {
    const ruta = ['/profile/',this.nombreDeUsuario];
    this.router.navigate(ruta);
  }

  obtenerPerfilUsuario() {
    this.dbTopsterService.consultarUsuariosPorNombre(this.nombreDeUsuario)
      .subscribe({
        next: (datos) => {
          this.usuario = Object.assign({}, datos[0]);
          this.src = this.usuario.fotoDePerfil
          this.prepararFormulario()
        },
        error: (error) => {
          console.error({ error });
        }
      })
  }

  private prepararFormulario() {
    this.formGroup = this.formBuilder.group({
      nombre: new FormControl(
        {
          value: this.usuario.nombres,
          disabled: false
        }
      ),
      apellido: new FormControl(
        {
          value: this.usuario.apellidos,
          disabled: false
        }
      ),
      nombreDeUsuario: new FormControl(
        {
          value: this.usuario.nickname,
          disabled: false
        }
      ),
      genero: new FormControl(
        {
          value: this.usuario.genero,
          disabled: false
        }
      ),
      correo: new FormControl(
        {
          value: this.usuario.correo,
          disabled: false
        }
      ),
      biografia: new FormControl(
        {
          value: this.usuario.biografia,
          disabled: false
        }
      )

    });

  }

  selectFile(event:any): void {
    this.selectedFiles = event.target.files;
    this.upload()
  }

  upload(): void {
    const file = this.selectedFiles?.item(0);
    this.selectedFiles = undefined;
    this.currentFileUpload = new FileUpload(file!);
    this.src = "https://i.pinimg.com/originals/5c/d3/57/5cd3570c93ae3dc5bd2cdb299d02115b.gif"
  }
}
