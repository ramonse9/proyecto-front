
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

    return this.http.get( url )
          .pipe(
            map( (resp: {ok: boolean, Articulos: any}) => {
              return resp.Articulos
            })
          )
  }

  crearArticulo( articulo : { nombre: string, id_categoria: number } ){

    const url = `${ base_url }/articulos`;
    return this.http.post( url,  articulo );
  }

  actualizarArticulo( ID_ARTICULO: number, NOMBRE_ARTICULO:string, ID_CATEGORIA:number ){

    const url = `${ base_url }/articulos/${ID_ARTICULO}`;
    return this.http.put( url, { NOMBRE_ARTICULO, ID_CATEGORIA} );
  }
}
