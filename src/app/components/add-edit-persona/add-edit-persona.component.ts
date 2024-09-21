import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConexionApiService } from '../../services/conexion-api.service';
import { Persona } from '../../interfaces/persona.interface';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-edit-persona',
  templateUrl: './add-edit-persona.component.html',
  styleUrl: './add-edit-persona.component.css'
})
export class AddEditPersonaComponent {
  unaPersona_id!:number;
  unaPersona: Persona = {
    id_persona:-1,
    nombre:'',
    apellido:'',
    fecha_nacimiento:'',
    'Numero Documento':'',
    Tipo_documento:''
  };
  unResultado!:any;
  unaAccion!:string;
  unMensaje!:string;
  
  constructor(private router:Router,
    private parametros: ActivatedRoute,
    private dataBD: ConexionApiService,
  ){
    this.parametros.params.subscribe((params) => {
      this.unaPersona_id =params['id']

      console.log("Persona", this.unaPersona_id);

      if (this.unaPersona_id != -1){
       
        this.cargarPersonaBD()
      }
    });
  }
  async cargarPersonaBD() {
    try {
      const data = await this.dataBD.getUnaPersona(this.unaPersona_id).toPromise();
      this.unaPersona = data;
      console.log(this.unaPersona);
    } catch (error) {
      console.error('Error al cargar la persona:', error);
    }
  }
  guardar(){
    console.log("llamo a Guardar")
 
 
    if (this.unaPersona_id == -1) {
 
 
      this.nuevaPersona();
 
 
    } else {
 
 
      this.actualizarPersona();
 
 
    }
 
 
  }
 
 
  actualizarPersona() {
    
    this.dataBD.crud_Personas(this.unaPersona, 'modificar').subscribe(
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
 
 
          this.router.navigate(['/personas']);
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
 
 
  async nuevaPersona() {
    await this.dataBD.crud_Personas(this.unaPersona, 'insertar').subscribe(
      (res: any) => {
        this.unResultado = res;
 
 
        console.log('RESULTADO_NUEVO', this.unResultado);
 
 
        if (this.unResultado.ok == true) {
          this.unaAccion = 'Mensaje:';
          this.unMensaje = 'Persona Insertada';
          Swal.fire({
            icon: 'info',
            title: 'Information',
            text: this.unMensaje,
          });
 
 
          setTimeout(() => (this.unMensaje = ''), 3000);
 
 
          this.router.navigate(['/personas']);
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
