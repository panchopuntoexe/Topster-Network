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
  correo = '';
  password = '';
  username = '';
  usuario: UsuarioInterfaz[] = []
  mostrarError = false;

  constructor(
    private readonly dbTopsterService: DbtopsterService,
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
  }

  ingresar() {
    //Verificaciones
    if (this.correo != '') {
      this.dbTopsterService
        .consultarUsuariosPorCorreo(this.correo)
        .subscribe({
          next: (datos) => {
            this.usuario = datos;
            if (this.usuario.length != 0) {
              this.username = this.usuario[0].nickname;
              if (this.password == this.usuario[0].clave) {
                // Envío de usuario logeado
                localStorage.setItem('nombreDeUsuario', this.username);
                const ruta = ['/home', this.username];
                this.router.navigate(ruta);
              } else {
                this.mostrarError = !this.mostrarError;
              }
            } else {
              this.mostrarError = !this.mostrarError;
            }
          },
          error: (error) => {
            console.log(error)
          }
        })
    } else {
      this.mostrarError = !this.mostrarError;
    }

  }

}
