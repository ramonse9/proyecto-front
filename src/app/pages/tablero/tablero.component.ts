import { Component, OnInit } from '@angular/core';
import { InventarioService } from 'src/app/services/inventario.service';
import lodash from 'lodash';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css']
})
export class TableroComponent implements OnInit {

  public inventario: any = [];
  public inventarioTemp: any = [];
  public cargandoInventario = true;
  private tipoOrden: string = 'nombre';

  public seleccionTienda = "Tienda";

  public filtroTiendas : any = [];

  constructor(  private inventarioService: InventarioService ) { }

  ngOnInit(): void {
    this.cargarInventario();

  }

  cargarInventario(){

    this.cargandoInventario = true;

    this.inventarioService.cargarInventario()
          .subscribe( resp =>{
            this.inventario = resp;
            this.inventarioTemp = resp;
            this.cargandoInventario = false;
            
            this.filtroTiendas = [ ...new Set( this.inventario.map( i => i.NOMBRE_TIENDA )) ];

            this.filtroTiendas.unshift('Tienda');

          });
  }

  buscar(termino: string )
  {
    
    this.seleccionTienda = "Tienda";

    if(termino.trim().length == 0){

      this.inventarioTemp = this.inventario;       

      return;
    }

    this.inventarioTemp = this.inventario.filter( i => i.NOMBRE_ARTICULO.toLowerCase().indexOf( termino.trim().toLowerCase() ) > -1 );
    
  }

  get inventarioOrdenado(){
   
      return lodash.sortBy( this.inventarioTemp, this.tipoOrden);
   
  }

  ordenar( tipoOrden: string){
    this.tipoOrden = tipoOrden;
  }

  filtrarTienda(event: any ){

    const seleccionado = event.target.value;

    if( seleccionado == "Tienda" ){
 
      this.inventarioTemp = this.inventario;
      return;
    }
    this.inventarioTemp = this.inventario.filter( t => t.NOMBRE_TIENDA === seleccionado );

  }

}
