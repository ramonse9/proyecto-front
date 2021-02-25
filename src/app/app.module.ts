import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ArticulosComponent } from './pages/articulos/articulos.component';
import { TiendasComponent } from './pages/tiendas/tiendas.component';
import { InventarioComponent } from './pages/inventario/inventario.component';
import { TableroComponent } from './pages/tablero/tablero.component';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ArticulosComponent,
    TiendasComponent,
    InventarioComponent,
    TableroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,   
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
