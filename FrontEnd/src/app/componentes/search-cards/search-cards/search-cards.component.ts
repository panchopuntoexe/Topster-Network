import { Component, Input, OnInit } from '@angular/core';
import { UsuarioInterfaz } from 'src/app/servicios/interfaces/UsuarioInterfaz';

@Component({
  selector: 'app-search-cards',
  templateUrl: './search-cards.component.html',
  styleUrls: ['./search-cards.component.scss']
})
export class SearchCardsComponent implements OnInit {

  arreglo = {}

  @Input()
  usuario:UsuarioInterfaz={
    idUsuario: 1,
    nickname: "nickname",
    biografia: "biografia",
    apellidos: "apellidos",
    nombres: "nombres",
    correo: "correo",
    clave: "clave",
    fechaDeNacimiento: "06/07/1999",
    genero: "Hombre",
    fotoDePerfil: undefined as unknown as Blob
  }


  constructor() { }

  ngOnInit(): void {
  }

}
