import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TiendasService } from 'src/app/services/tiendas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tiendas',
  templateUrl: './tiendas.component.html',
  styleUrls: ['./tiendas.component.css']
})
export class TiendasComponent implements OnInit {

  public tiendaForm: FormGroup;

  public tiendas : any = [];

  public cargandoTiendas = true;

  constructor( private fb: FormBuilder
              ,private tiendaService: TiendasService ) { }

  async ngOnInit() {

    this.tiendaForm = this.fb.group({
     
      nombre: ['', Validators.required ]

    });

    await this.cargarTiendas();

  }
  
  async cargarTiendas(){

    this.cargandoTiendas = true;

    console.log( 'antes cargarTiendas()');

    const respTiendas = await this.tiendaService.cargarTiendas().toPromise();

    console.log( 'despues cargarTiendas(): ', respTiendas );

    this.tiendas = respTiendas
    
    this.cargandoTiendas = false;
  }


  async agregarTienda(){

    const { nombre } = this.tiendaForm.value;
    console.log( 'this.tiendaForm.value: ', this.tiendaForm.value  );
    console.log( 'nombre: ', nombre  );

    const tienda = {
      nombre
    }

    const respTiendas = await this.tiendaService.crearTienda( tienda ).toPromise();

    console.log( 'despues cargarTiendas(): ', respTiendas );

    await this.cargarTiendas();
 
  }

  guardarCambios( t: any){

    console.log( 'tienda:' , t );

    console.log( ' t.id_tienda: ', t.id_tienda  );
    console.log( ' t.nombre: ', t.nombre);

    this.tiendaService.actualizarTienda( t.ID_TIENDA, t.NOMBRE )
              .subscribe( resp => {

                Swal.fire( 'Actualizado', t.NOMBRE );

              });


  }

}
