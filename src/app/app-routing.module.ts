import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticulosComponent } from './pages/articulos/articulos.component';
import { InventarioComponent } from './pages/inventario/inventario.component';
import { TableroComponent } from './pages/tablero/tablero.component';
import { TiendasComponent } from './pages/tiendas/tiendas.component';

const routes: Routes = [
  { path: 'tablero', component: TableroComponent },
  { path: 'articulos', component: ArticulosComponent },
  { path: 'tiendas', component: TiendasComponent },
  { path: 'inventario', component: InventarioComponent },
  { path: '', redirectTo: '/tablero', pathMatch: 'full' },
  { path: '**', redirectTo: '/tablero', pathMatch: 'full' }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot( routes ),
  
    
  ],
  exports: [ RouterModule]
})
export class AppRoutingModule { }
