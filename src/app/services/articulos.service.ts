
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ArticulosService {

  constructor(private http: HttpClient) { }

  cargarArticulos(){
    const url = `${ base_url }/articulos`;

    console.log( 'url: ', url);

    return this.http.get( url )
          .pipe(
            map( (resp: {ok: boolean, Tiendas: any}) => {
              return resp.Tiendas
            })
          )
  }

  crearArticulo( articulo : { nombre: string, id_categoria: number } ){
    console.log( 'crearArticulo : ', articulo );

    const url = `${ base_url }/articulos`;
    return this.http.post( url,  articulo );
  }

  actualizarArticulo( ID_ARTICULO: number, NOMBRE:string, ID_CATEGORIA:number ){

    console.log( 'service id:', ID_ARTICULO);

    const url = `${ base_url }/tiendas/${ID_ARTICULO}`;
    return this.http.put( url, { NOMBRE, ID_ARTICULO , ID_CATEGORIA} );
  }
}
