import { Component, OnInit } from '@angular/core';
import { ConexionApiService } from '../../services/conexion-api.service';
import { Router } from '@angular/router';
import { Usuario } from '../../interfaces/usuario.interface';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})

export class UsuarioComponent {


  usuarios!: any;


  constructor(
    private dataBD: ConexionApiService,
    private router: Router,
  ) {
  }


  ngOnInit() {

    this.cargarUsuariosBD();
  }




  async cargarUsuariosBD() {
    await this.dataBD
      .getUsuarios()
      .toPromise()
      .then((data: any) => {
        this.usuarios = data;
        console.log(this.usuarios)
      });
  }

  
  eliminarUsuario(unUsuario: Usuario): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Quieres eliminar a ${unUsuario.email}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.dataBD.crud_usuarios(unUsuario, 'eliminar').subscribe(
          async (res: any) => {
            if (res.Ok) {
              Swal.fire({
                icon: 'success',
                title: 'Eliminado',
                text: 'Usuario eliminado con éxito',
              })

             
              await this.cargarUsuariosBD();
            } else {
              
              Swal.fire({
                icon: 'success',
                title: 'Eliminado',
                text: 'Usuario eliminado con éxito',
              });
            }
          },
          (error: any) => {
            console.error('Error deleting Usuario:', error);
            
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: error.error?.msg || 'No se pudo eliminar el usuario. Verifica los logs del servidor para más detalles.',
            });
          }
        );
      }
    });
  }

  editarUsuario(unIdUsuario:number){
    this.router.navigate(['/user', unIdUsuario])
  }






}

