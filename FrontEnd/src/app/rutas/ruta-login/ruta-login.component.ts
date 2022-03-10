import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DbtopsterService } from 'src/app/servicios/html/dbtopster.service';
import { UsuarioInterfaz } from 'src/app/servicios/interfaces/UsuarioInterfaz';

@Component({
  selector: 'app-ruta-login',
  templateUrl: './ruta-login.component.html',
  styleUrls: ['./ruta-login.component.scss']
})
export class RutaLoginComponent implements OnInit {

  loginGroup!: FormGroup;
  username = '';
  password = '';
  usuario ?: UsuarioInterfaz;

  constructor(
    private readonly dbTopsterService: DbtopsterService,
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
  }

  ingresar(){
    //Verificaciones
    console.log(this.username)
    this.dbTopsterService
    .consultarUsuariosPorCorreo(this.username)
    .subscribe({
      next: (datos) => {
        console.log(datos);
      },
      error: (error) => {
        console.log(error);
      }
    })
    const usuario = this.dbTopsterService.consultarUsuariosPorCorreo(this.username);
    console.log(usuario);
    // if(){
      const ruta = ['/home', this.username];
      this.router.navigate(ruta);
    // } else {

    // }

  }

}
