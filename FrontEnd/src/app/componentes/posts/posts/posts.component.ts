import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})


export class PostsComponent implements OnInit {

  arregloPosts = [
    {
      fotoPerfil: 'https://realestatemarket.com.mx/images/influencers/mark.jpg',
      nombreUsuario: 'Mark Zuckerberg',
      imagenPost: 'https://i.redd.it/x7nxdaef5eg21.jpg',
      descripcionPost: 'Hello Everybody',
      fechaPost: '21/12/2021',
    },
    {
      fotoPerfil: 'https://yt3.ggpht.com/gCzmAWJBMGq8oWajAUs6UVzw1V0I2WSRYOv-nTsmmW9WK384gh9nJm1BVnfAmGqRYKjDytAcTw=s900-c-k-c0x00ffffff-no-rj',
      nombreUsuario: 'Bad Bunny',
      imagenPost: 'https://pbs.twimg.com/media/FJ4hkE4X0AAe61Q?format=jpg&name=large',
      descripcionPost: 'Se viene el mejor tour del f*cking mundo',
      fechaPost: '16/11/2022',
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
