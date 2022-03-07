import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbtopsterService } from 'src/app/servicios/html/dbtopster.service';

@Component({
  selector: 'app-ruta-home',
  templateUrl: './ruta-home.component.html',
  styleUrls: ['./ruta-home.component.scss']
})
export class RutaHomeComponent implements OnInit {

  constructor(
    private readonly dbTopsterService: DbtopsterService,
    private readonly router: Router,
  ) { }

  posts={}

  ngOnInit(): void {
  }

  consultarPosts(){
    //TODO consultar seguidos y consultar posts de estos-> lleno a posts{}
  }

  


}
