import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//estilos
import {MatToolbarModule} from '@angular/material/toolbar'; 

//componentes
import {StyleFormSharedModule} from './style-form-shared/style-form-shared.module';
import { RegistroUsuarioComponent } from './registro/registro-usuario.component';


@NgModule({
  declarations: [
    AppComponent,
    RegistroUsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    StyleFormSharedModule,
    MatToolbarModule
  ],
  exports: [MatToolbarModule],  //verificar
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
