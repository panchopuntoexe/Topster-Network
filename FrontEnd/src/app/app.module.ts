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
import { PostsModule } from './componentes/posts/posts/posts.module';
import { SearchCardsModule } from './componentes/search-cards/search-cards/search-cards.module';
import {HttpClientModule} from "@angular/common/http";
import { CommentsModule } from './componentes/comments/comments/comments.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { SafeUrlPipe } from './servicios/safe-url.pipe';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

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
    RutaPostComponent,
    SafeUrlPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PostsModule,
    SearchCardsModule,
    CommentsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
