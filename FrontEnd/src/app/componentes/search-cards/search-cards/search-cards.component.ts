import { Component, Input, OnInit } from '@angular/core';
import { UsuarioInterfaz } from 'src/app/servicios/interfaces/UsuarioInterfaz';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-search-cards',
  templateUrl: './search-cards.component.html',
  styleUrls: ['./search-cards.component.scss']
})
export class SearchCardsComponent implements OnInit {

  arreglo = {}

  src!: SafeResourceUrl;

  @Input()
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
    fotoDePerfil: {type: ArrayBuffer,data: []}
  }


  constructor(
    private sanitizer: DomSanitizer
  ) { }


  ngOnInit(): void {
    let objectURL = 'data:image/jpg;base64,' + this._arrayBufferToBase64(this.usuario.fotoDePerfil.data);
    this.src = this.sanitizer.bypassSecurityTrustUrl(objectURL);
  }

  toArrayBuffer(buf: string | any[]):ArrayBuffer {
    const ab = new ArrayBuffer(buf.length);
    const view = new Uint8Array(ab);
    for (let i = 0; i < buf.length; ++i) {
        view[i] = buf[i];
    }
    return ab;
}


  _arrayBufferToBase64(buffer: Iterable<number>) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }


}
