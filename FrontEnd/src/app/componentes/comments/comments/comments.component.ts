import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DbtopsterService } from 'src/app/servicios/html/dbtopster.service';
import { ComentarioInterfaz } from 'src/app/servicios/interfaces/ComentarioInterfaz';
import { UsuarioInterfaz } from 'src/app/servicios/interfaces/UsuarioInterfaz';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})

export class CommentsComponent implements OnInit {

  @Input()
  arregloComentarios:ComentarioInterfaz[]=[]

  
  idUsuarioActual:number=0

  @Input()
  idPost:number=0

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

  nuevoComentario:ComentarioInterfaz={
    idComentario:0,
    idUsuario:0,
    idPost:0,
    descripcionComentario:"",
    fechaComentario:""
  }

  formGroup!: FormGroup;

  obtenerNombreDeUsuario(idUsuario:number):string{
    return "BBBBRAJ"
  }

  constructor(
    private readonly dbTopsterService: DbtopsterService,
    private readonly formBuilder: FormBuilder,)
    {
      this.prepararFormulario()
      this.obtenerUsuarioLogueado()
    }

  ngOnInit(): void {
    console.log(this.arregloComentarios)
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


  aniadirComentario(){
    this.nuevoComentario.descripcionComentario = this.formGroup?.get('comentario')?.value
    this.nuevoComentario.idPost = this.idPost
    this.nuevoComentario.idUsuario = this.usuarioLogueado.idUsuario
    this.nuevoComentario.fechaComentario = this.tomarFechaDeHoy()
    this.dbTopsterService.crearComentario(this.nuevoComentario)
      .subscribe()
    this.arregloComentarios.push(this.nuevoComentario)
    this.prepararFormulario()
  }

  private prepararFormulario() {
    this.formGroup = this.formBuilder.group({
      comentario: new FormControl(
        {
          value: "",
          disabled: false
        }
      )

    });

  }

  tomarFechaDeHoy():string {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    return date + ' ' + time;
}


}
