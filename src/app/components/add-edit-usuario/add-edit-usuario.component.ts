import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConexionApiService } from '../../services/conexion-api.service';
import { Usuario } from '../../interfaces/usuario.interface';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-edit-usuario',
  templateUrl: './add-edit-usuario.component.html',
  styleUrl: './add-edit-usuario.component.css'
})
export class AddEditUsuarioComponent {
  unUsuario_id!:number;
  unUsuario: Usuario = {
    id_usuario: -1, 
    email: '', 
    password: '', 
    id_persona: 1, 
    rol: 'USER_ROLE', 
    estado: true 
  };
  unResultado!:any;
  unaAccion!:string;
  unMensaje!:string;
  
  constructor(private router:Router,
    private parametros: ActivatedRoute,
    private dataBD: ConexionApiService,
  ){
    this.parametros.params.subscribe((params) => {
      this.unUsuario_id =params['id']

      console.log("Persona", this.unUsuario_id);

      if (this.unUsuario_id != -1){
       
        this.cargarUsuarioBD()
      }
    });
  }
  async cargarUsuarioBD() {
    try {
      const data = await this.dataBD.getUnUsuario(this.unUsuario_id).toPromise();
      this.unUsuario = data;
      console.log(this.unUsuario);
    } catch (error) {
      console.error('Error al cargar la persona:', error);
    }
  }
  guardar(){
    console.log("llamo a Guardar")
 
 
    if (this.unUsuario_id == -1) {
 
 
      this.nuevoUsuario();
 
 
    } else {
 
 
      this.actualizarUsuario();
 
 
    }
 
 
  }
 
 
  actualizarUsuario() {
    console.log('Datos antes de actualizar', this.unUsuario);
    this.dataBD.crud_usuarios(this.unUsuario, 'modificar').subscribe(
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
 
 
          this.router.navigate(['/usuario']);
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
 
 
  async nuevoUsuario() {
    await this.dataBD.crud_usuarios(this.unUsuario, 'insertar').subscribe(
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
 
 
          this.router.navigate(['/usuario']);
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


