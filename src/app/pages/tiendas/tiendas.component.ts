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

    const respTiendas = await this.tiendaService.cargarTiendas().toPromise();

    this.tiendas = respTiendas
    
    this.cargandoTiendas = false;
  }

  async agregarTienda(){

    const { nombre } = this.tiendaForm.value;

    const tienda = {
      nombre
    }

    await this.tiendaService.crearTienda( tienda ).toPromise();

    await this.cargarTiendas();
 
  }

  guardarCambios( t: any){

    this.tiendaService.actualizarTienda( t.ID_TIENDA, t.NOMBRE )
              .subscribe( resp => {

                Swal.fire( 'Actualizado', t.NOMBRE );

              });
  }

}
