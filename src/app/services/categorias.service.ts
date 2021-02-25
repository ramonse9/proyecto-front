import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  constructor( private http: HttpClient ) { }

  cargarCategorias(){
    const url = `${ base_url }/categorias`;

    console.log( 'url: ', url);

    return this.http.get( url )
          .pipe(
            map( (resp: {ok: boolean, Categorias: any}) => {
              return resp.Categorias
            })
          )
  }
}
