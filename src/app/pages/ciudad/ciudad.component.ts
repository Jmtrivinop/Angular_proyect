import { Component, OnInit } from '@angular/core';
import { ConexionApiService } from '../../services/conexion-api.service';
import { Router } from '@angular/router';
import { Ciudad } from '../../interfaces/ciudad.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ciudad',
  templateUrl: './ciudad.component.html',
  styleUrl: './ciudad.component.css'
})
export class CiudadComponent {
  ciudades!: any;


  constructor(
    private dataBD: ConexionApiService,
    private router: Router,
  ) {
  }


  ngOnInit() {

    this.cargarCiudadBD();
  }




  async cargarCiudadBD() {
    await this.dataBD
      .getCiudades()
      .toPromise()
      .then((data: any) => {
        this.ciudades = data;
        console.log(this.ciudades)
      });
  }

  
  eliminarCiudad(unaCiudad: Ciudad): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Quieres eliminar a ${unaCiudad.nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.dataBD.crud_ciudades(unaCiudad, 'eliminar').subscribe(
          async (res: any) => {
            if (res.Ok) {
              Swal.fire({
                icon: 'success',
                title: 'Eliminado',
                text: 'Ciudad eliminada con éxito',
              })

             
              await this.cargarCiudadBD();
            } else {
              
              Swal.fire({
                icon: 'success',
                title: 'Eliminado',
                text: 'Ciudad eliminada con éxito',
              });
            }
          },
          (error: any) => {
            console.error('Error deleting persona:', error);
            
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: error.error?.msg || 'No se pudo eliminar la persona. Verifica los logs del servidor para más detalles.',
            });
          }
        );
      }
    });
  }

  editarCiudad(unIdCiudad:number){
    this.router.navigate(['/ciudad', unIdCiudad])
  }





}
