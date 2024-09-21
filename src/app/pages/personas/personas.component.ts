import { Component, OnInit } from '@angular/core';
import { ConexionApiService } from '../../services/conexion-api.service';
import { Router } from '@angular/router';
import { Persona } from '../../interfaces/persona.interface';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrl: './personas.component.css'
})
export class PersonasComponent {


  personas!: any;


  constructor(
    private dataBD: ConexionApiService,
    private router: Router,
  ) {
  }


  ngOnInit() {

    this.cargarPersonasBD();
  }




  async cargarPersonasBD() {
    await this.dataBD
      .getPersonas()
      .toPromise()
      .then((data: any) => {
        this.personas = data;
        console.log(this.personas)
      });
  }

  
  eliminarPersona(unaPersona: Persona): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Quieres eliminar a ${unaPersona.nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.dataBD.crud_Personas(unaPersona, 'eliminar').subscribe(
          async (res: any) => {
            if (res.Ok) {
              Swal.fire({
                icon: 'success',
                title: 'Eliminado',
                text: 'Persona eliminada con éxito',
              })

             
              await this.cargarPersonasBD();
            } else {
              
              Swal.fire({
                icon: 'success',
                title: 'Eliminado',
                text: 'Persona eliminada con éxito',
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

  editarPersona(unIdPersona:number){
    this.router.navigate(['/persona', unIdPersona])
  }






}

