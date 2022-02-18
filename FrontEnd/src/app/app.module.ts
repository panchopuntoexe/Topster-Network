import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RutaLoginComponent } from './rutas/ruta-login/ruta-login.component';
import { RutaRegisterComponent } from './rutas/ruta-register/ruta-register.component';
import { RutaHomeComponent } from './rutas/ruta-home/ruta-home.component';
import { RutaSearchComponent } from './rutas/ruta-search/ruta-search.component';
import { RutaProfileComponent } from './rutas/ruta-profile/ruta-profile.component';
import { RutaEditComponent } from './rutas/ruta-edit/ruta-edit.component';
import { RutaNotFoundComponent } from './rutas/ruta-not-found/ruta-not-found.component';
import { RutaPostComponent } from './rutas/ruta-post/ruta-post.component';

@NgModule({
  declarations: [
    AppComponent,
    RutaLoginComponent,
    RutaRegisterComponent,
    RutaHomeComponent,
    RutaSearchComponent,
    RutaProfileComponent,
    RutaEditComponent,
    RutaNotFoundComponent,
    RutaPostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
