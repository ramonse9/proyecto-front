
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class TiendasService {

  constructor( private http: HttpClient ) { }

  cargarTiendas(){
    const url = `${ base_url }/tiendas`;

    console.log( 'url: ', url);

    return this.http.get( url )
          .pipe(
            map( (resp: {ok: boolean, Tiendas: any}) => {
              return resp.Tiendas
            })
          )
  }

  crearTienda( tienda : { nombre: string } ){
    console.log( 'crearTienda: ', tienda );

    const url = `${ base_url }/tiendas`;
    return this.http.post( url,  tienda );
  }

  actualizarTienda( ID_TIENDA: number, NOMBRE:string ){

    console.log( 'service id:', ID_TIENDA);

    const url = `${ base_url }/tiendas/${ID_TIENDA}`;
    return this.http.put( url, { NOMBRE } );
  }
}
