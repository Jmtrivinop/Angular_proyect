import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConexionApiService } from '../../services/conexion-api.service';
import { Ciudad } from '../../interfaces/ciudad.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-edit-ciudad',
  templateUrl: './add-edit-ciudad.component.html',
  styleUrl: './add-edit-ciudad.component.css'
})
export class AddEditCiudadComponent {
  unaCiudadId!:number;
  unaCiudad: Ciudad = {
    id_ciudad: -1, 
    nombre: '', 
    pais: '', 
   
  };
  unResultado!:any;
  unaAccion!:string;
  unMensaje!:string;
  
  constructor(private router:Router,
    private parametros: ActivatedRoute,
    private dataBD: ConexionApiService,
  ){
    this.parametros.params.subscribe((params) => {
      this.unaCiudadId =params['id']

      console.log("Persona", this.unaCiudadId);

      if (this.unaCiudadId != -1){
       
        this.cargarCiudadBD()
      }
    });
  }
  async cargarCiudadBD() {
    try {
      const data = await this.dataBD.getUnaCiudad(this.unaCiudadId).toPromise();
      this.unaCiudad = data;
      console.log(this.unaCiudad);
    } catch (error) {
      console.error('Error al cargar la ciudad:', error);
    }
  }
  guardar(){
    console.log("llamo a Guardar")
 
 
    if (this.unaCiudadId == -1) {
 
 
      this.nuevaCiudad();
 
 
    } else {
 
 
      this.actualizarCiudad();
 
 
    }
 
 
  }
 
 
  actualizarCiudad() {
    console.log('Datos antes de actualizar', this.unaCiudad);
    this.dataBD.crud_ciudades(this.unaCiudad, 'modificar').subscribe(
      (res: any) => {
        this.unResultado = res;
 
 
        console.log('RESULTADO_ACTUALIZAR', this.unResultado);
 
 
        if (this.unResultado.ok == true) {
          console.log(this.unResultado);
          this.unaAccion = 'Mensaje:';
          this.unMensaje = 'Registro de Persona Actualizado...';
          setTimeout(() => (this.unMensaje = ''), 3000);
 
 
          Swal.fire({
            icon: 'info',
            title: 'Information',
            text: this.unMensaje,
          });
 
 
          this.router.navigate(['/ciudad']);
        } else {
          this.unaAccion = 'Error:';
          this.unMensaje = this.unResultado.error.msg;
          setTimeout(() => (this.unMensaje = ''), 3000);
        }
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
 
 
  async nuevaCiudad() {
    await this.dataBD.crud_ciudades(this.unaCiudad, 'insertar').subscribe(
      (res: any) => {
        this.unResultado = res;
 
 
        console.log('RESULTADO_NUEVO', this.unResultado);
 
 
        if (this.unResultado.ok == true) {
          this.unaAccion = 'Mensaje:';
          this.unMensaje = 'Usuario Insertada';
          Swal.fire({
            icon: 'info',
            title: 'Information',
            text: this.unMensaje,
          });
 
 
          setTimeout(() => (this.unMensaje = ''), 3000);
 
 
          this.router.navigate(['/ciudad']);
        } else {
          this.unaAccion = 'Error:';
          this.unMensaje = this.unResultado.msg;
          setTimeout(() => (this.unMensaje = ''), 3000);
        }
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
}
