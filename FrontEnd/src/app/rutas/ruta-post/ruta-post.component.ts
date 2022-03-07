import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbtopsterService } from 'src/app/servicios/html/dbtopster.service';

@Component({
  selector: 'app-ruta-post',
  templateUrl: './ruta-post.component.html',
  styleUrls: ['./ruta-post.component.scss']
})
export class RutaPostComponent implements OnInit {

  constructor(
    private readonly dbTopsterService: DbtopsterService,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
  }

  crearPost(){
  //Creación del Post del usuario
  const ruta = ['/home/nombreUsuario'];
  this.router.navigate(ruta);
  }

}
