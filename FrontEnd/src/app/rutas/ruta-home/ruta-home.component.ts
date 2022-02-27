import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ruta-home',
  templateUrl: './ruta-home.component.html',
  styleUrls: ['./ruta-home.component.scss']
})
export class RutaHomeComponent implements OnInit {

  constructor() { }

  posts={}

  ngOnInit(): void {
  }

  consultarPosts(){
    //TODO consultar seguidos y consultar posts de estos-> lleno a posts{}
  }


}
