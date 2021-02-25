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

    this.articulos = respArticulos
    
    this.cargandoArticulos = false;
  }  

  async agregarArticulo(){

    const { nombre, categoria } = this.articuloForm.value;

    const id_categoria = categoria;

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
