import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RutaEditComponent } from './rutas/ruta-edit/ruta-edit.component';
import { RutaHomeComponent } from './rutas/ruta-home/ruta-home.component';
import { RutaLoginComponent } from './rutas/ruta-login/ruta-login.component';
import { RutaNotFoundComponent } from './rutas/ruta-not-found/ruta-not-found.component';
import { RutaPostComponent } from './rutas/ruta-post/ruta-post.component';
import { RutaProfileComponent } from './rutas/ruta-profile/ruta-profile.component';
import { RutaRegisterComponent } from './rutas/ruta-register/ruta-register.component';
import { RutaSearchComponent } from './rutas/ruta-search/ruta-search.component';

const routes: Routes = [

  {
    path: 'login',
    component: RutaLoginComponent
  },
  {
    path: 'register',
    component: RutaRegisterComponent
  },
  {
    path: 'home',
    component: RutaHomeComponent 
  },
  {
    path: 'search',
    component: RutaSearchComponent 
  },
  {
    path: 'profile',
    component: RutaProfileComponent
  },
  {
    path: 'edit',
    component: RutaEditComponent
  },
  {
    path: 'post',
    component: RutaPostComponent
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: RutaNotFoundComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(
    routes
    )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
