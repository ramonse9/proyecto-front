import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticulosService } from 'src/app/services/articulos.service';
import { CategoriasService } from 'src/app/services/categorias.service';
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
  public categorias : any = [];

  public cargandoCategorias = true;
  public cargandoArticulos = true;


  constructor(private fb: FormBuilder
    , private articuloService: ArticulosService
    , private categoriaService: CategoriasService) { }

  async ngOnInit() {

    this.articuloForm = this.fb.group({
     
      nombre: ['', Validators.required ],
      categoria: ['', Validators.required]

    });

    await this.cargarCategorias();
    await this.cargarArticulos();

  }

  async cargarArticulos(){

    this.cargandoArticulos = true;

    const respArticulos = await this.articuloService.cargarArticulos().toPromise();

    this.articulos = respArticulos;
    
    
    //asigno el listado de categorias sin repetir a los articulos
    this.articulos.map( a => a.categorias_nombres_varios = [ ...new Set( this.articulos.filter( a2 => a2.NOMBRE_ARTICULO === a.NOMBRE_ARTICULO ).map( a3 => a3.NOMBRE_CATEGORIA) ) ]  );

    
    //Obtengo el listado de articulos sin repetir
    const articulosFiltro = [ ...new Set( this.articulos.map( a => a.NOMBRE_ARTICULO) )]  ;
    
    
    //Ontengo el arrelgo completo de articulos que no estan repetidos
    const nuevosArticulos = articulosFiltro.map( af => this.articulos.find( a => a.NOMBRE_ARTICULO === af ) ) ;
    
    //Asigno el listado de articulos al arreglo original para que se muestre
    this.articulos = nuevosArticulos.filter( na => na);
    
    this.cargandoArticulos = false;
  }  

  async agregarArticulo(){

    const { nombre, categoria } = this.articuloForm.value;

    const id_categoria = categoria;

    console.log( 'this.articulos: ', this.articulos );


    const registrado = this.articulos.find( a => a.NOMBRE_ARTICULO === nombre && a.ID_CATEGORIA == categoria  );

    if(registrado ){
      Swal.fire( 'Problema', 'Articulo ya registado');
      return;
    }
    

    const articulo = {
      nombre,
      id_categoria
    }
    
    await this.articuloService.crearArticulo( articulo ).toPromise();
    
    await this.cargarArticulos();
  }

  async guardarCambios( a: any){
    
    await this.articuloService.actualizarArticulo( a.ID_ARTICULO, a.NOMBRE_ARTICULO, a.ID_CATEGORIA ).toPromise();
    
    Swal.fire( 'Actualizado', a.NOMBRE_ARTICULO );
                
    await this.cargarArticulos();
              
  }

  async cargarCategorias(){
    this.cargandoCategorias = true;

    const respCategorias = await this.categoriaService.cargarCategorias().toPromise();

    this.categorias = respCategorias
    
    this.cargandoCategorias = false;

  }

}
