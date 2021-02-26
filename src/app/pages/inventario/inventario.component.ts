import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticulosService } from 'src/app/services/articulos.service';
import { CategoriasService } from 'src/app/services/categorias.service';
import { InventarioService } from 'src/app/services/inventario.service';
import { TiendasService } from 'src/app/services/tiendas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {

  public inventarioForm: FormGroup;

  public tiendas : any = [];
  public articulos: any = [];
  public categorias: any = [];
  public inventario: any = [];

  public seleccionCategoria = '';

  public cargandoInventario = true;

  constructor( private fb: FormBuilder
             , private tiendaService: TiendasService
             , private articuloService: ArticulosService
             , private categoriaService: CategoriasService
             , private inventarioService: InventarioService ) { }

  ngOnInit(): void {
    this.inventarioForm = this.fb.group({
     
      tienda: ['', Validators.required ],
      articulo: ['', Validators.required ],
      cantidad: ['', Validators.required ]

    });

    this.cargarTiendas();
    this.cargarArticulos();
    this.cargarCategorias();
    this.cargarInventario();

    this.inventarioForm.get('articulo').valueChanges
            .subscribe( articulo => {

              if(articulo==''){
                this.seleccionCategoria = '';
                return;
              } 
          
              this.seleccionCategoria = this.articulos.find( a=> a.ID_ARTICULO == articulo ).NOMBRE_CATEGORIA;
              
            });
  }

  cargarTiendas(){   

    this.tiendaService.cargarTiendas()
          .subscribe( resp =>{
            this.tiendas = resp;
   
          })
  }

  cargarArticulos(){    

    this.articuloService.cargarArticulos()
          .subscribe( resp =>{
            this.articulos = resp;
           
          })
  }

  cargarCategorias(){

    this.categoriaService.cargarCategorias()
          .subscribe( resp =>{
            this.categorias = resp;
          })
  }

  cargarInventario(){

    this.cargandoInventario = true;



    this.inventarioService.cargarInventario()
          .subscribe( resp =>{
            this.inventario = resp;
            this.cargandoInventario = false;     
          });
  }

  async agregarInventario(){

    const { tienda, articulo, cantidad  } = this.inventarioForm.value;
  
    const id_tienda = tienda;
    const id_articulo = articulo;

    const inventario = {
      id_tienda,
      id_articulo,
      cantidad
    }
    
    const respInventario = await this.inventarioService.crearInventario( inventario ).toPromise();

    this.inventarioForm.get('tienda').setValue('');
    this.inventarioForm.get('articulo').setValue('');
    this.inventarioForm.get('cantidad').setValue('');

    await this.cargarInventario();
  }

  async guardarCambios(i: any){
    
    await this.inventarioService.actualizarInventario( i.ID_INVENTARIO, i.ID_TIENDA, i.ID_ARTICULO, i.CANTIDAD ).toPromise();
    
    Swal.fire( 'Actualizado', i.CANTIDAD );
                
    await this.cargarInventario();

  }

}
