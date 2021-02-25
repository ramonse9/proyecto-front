import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  constructor(private http: HttpClient) { }

  cargarInventario(){
    const url = `${ base_url }/inventario`;

    console.log( 'url: ', url);

    return this.http.get( url )
          .pipe(
            map( (resp: {ok: boolean, Inventario: any}) => {
              return resp.Inventario
            })
          )
  }

  crearInventario( inventario : { id_tienda, id_articulo, cantidad: number } ){
    console.log( 'crearArticulo : ', inventario );

    const url = `${ base_url }/inventario`;
    return this.http.post( url, inventario );
  }

  actualizarInventario( ID_INVENTARIO: number, ID_TIENDA: number, ID_ARTICULO: number,  CANTIDAD: number ){

    console.log( 'id_articulo :', ID_INVENTARIO);

    console.log( 'ID_INVENTARIO', ID_INVENTARIO);
    console.log( 'ID_TIENDA', ID_TIENDA);
    console.log( 'ID_ARTICULO', ID_ARTICULO);
    console.log( 'CANTIDAD', CANTIDAD);

    


    const url = `${ base_url }/inventario/${ID_INVENTARIO}`;
    return this.http.put( url, {  ID_TIENDA, ID_ARTICULO, CANTIDAD } );
  }



}
