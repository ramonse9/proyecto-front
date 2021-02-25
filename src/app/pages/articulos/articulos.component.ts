import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticulosService } from 'src/app/services/articulos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styles: [
  ]
})
export class ArticulosComponent implements OnInit {

  
  public articuloForm: FormGroup;

  public articulos : any = [];

  public cargandoArticulos = true;


  constructor(private fb: FormBuilder
    ,private articuloService: ArticulosService) { }

  async ngOnInit() {

    this.articuloForm = this.fb.group({
     
      nombre: ['', Validators.required ],
      id_categoria: ['', Validators.required]

    });

    await this.cargarArticulos();

  }

  async cargarArticulos(){

    this.cargandoArticulos = true;

    console.log( 'antes cargarArticulos()');

    const respArticulos = await this.articuloService.cargarArticulos().toPromise();

    console.log( 'despues cargarArticulos(): ', respArticulos );

    this.articulos = respArticulos
    
    this.cargandoArticulos = false;
  }

  

  async agregarArticulo(){

    const { nombre, id_categoria } = this.articuloForm.value;
    console.log( 'this.articuoForm.value: ', this.articuloForm.value  );
    console.log( 'nombre: ', nombre  );

    const articulo = {
      nombre,
      id_categoria
    }

    const respArticulos = await this.articuloService.crearArticulo( articulo ).toPromise();

    console.log( 'despues cargarArticulos(): ', respArticulos );

    await this.cargarArticulos();
  }

  
  guardarCambios( a: any){

    console.log( 'articulo:' , a );

    console.log( ' t.id_articulo: ', a.ID_ARTICULO  );
    console.log( ' t.nombre: ', a.NOMBRE);
    console.log( ' t.categoria: ', a.ID_CATEGORIA);

    this.articuloService.actualizarArticulo( a.ID_ARTICULO, a.NOMBRE, a.ID_CATEGORIA )
              .subscribe( resp => {

                Swal.fire( 'Actualizado', a.NOMBRE );

              });
  }

}
