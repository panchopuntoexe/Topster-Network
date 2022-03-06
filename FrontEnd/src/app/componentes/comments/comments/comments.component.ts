import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  arregloComentarios = [
    {
      usuarioComentario: 'el_dios_del_perreito',
      descripcionComentario: 'Brah... ',
      fechaComentario: '24/12/2021'
    },
    {
      usuarioComentario: 'comic.ec',
      descripcionComentario: 'Bombardeen Guayakill ',
      fechaComentario: '26/12/2021'
    },
    {
      usuarioComentario: 'fannumerounodebillieeilish',
      descripcionComentario: "Why you don't get some bit**** for yourself?",
      fechaComentario: '31/12/2021'
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
