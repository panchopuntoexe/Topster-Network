import { Component, Input, OnInit } from '@angular/core';
import { ComentarioInterfaz } from 'src/app/servicios/interfaces/ComentarioInterfaz';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  @Input()
  arregloComentarios:ComentarioInterfaz[]=[]

  obtenerNombreDeUsuario(idUsuario:number):string{
    return "BBBBRAJ"
  }

  constructor() { }

  ngOnInit(): void {
  }

}
