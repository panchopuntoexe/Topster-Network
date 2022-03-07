import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbtopsterService } from 'src/app/servicios/html/dbtopster.service';

@Component({
  selector: 'app-ruta-search',
  templateUrl: './ruta-search.component.html',
  styleUrls: ['./ruta-search.component.scss']
})
export class RutaSearchComponent implements OnInit {

  constructor(
    private readonly dbTopsterService: DbtopsterService,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
  }

  buscarUsuario(){
    
  }

}
