import { Component } from '@angular/core';
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
  eliminarPersona(unaPersona: Persona){
    console.log(unaPersona)
    this.dataBD.crud_Personas(unaPersona, 'eliminar').subscribe(
      (res: any) => {
        this.unResultado = res;

        //console.log(this.unResultado);
        if (this.unResultado.Ok == true) {

           Swal.fire({
            icon: 'info',
            title: 'Information',
            text: 'Heroe Eliminado',
          });

          this.unaAccion = 'Mensaje:';
          this.unMensaje = 'Heroe Eliminado';
          setTimeout(() => (this.unMensaje = ''), 3000);


          this.cargarPersonasBD() ;

        } else {
          Swal.fire({
            icon: 'info',
            title: 'Information',
            text: this.unResultado.msg,
          });
    

          this.unaAccion = 'Error:';
          this.unMensaje = this.unResultado.msg;
          setTimeout(() => (this.unMensaje = ''), 3000);
        }
      }
      ,(error:any) => {
        console.error(error)
      }
    );
  }






}

