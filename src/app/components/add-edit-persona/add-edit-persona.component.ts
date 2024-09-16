import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConexionApiService } from '../../services/conexion-api.service';
import { Persona } from '../../interfaces/persona.interface';

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
    numero_documento:'',
    tipo_documento:''
  };
  constructor(private router:Router,
    private parametros: ActivatedRoute,
    private dataBD: ConexionApiService,
  ){
    this.parametros.params.subscribe((params) => {
      this.unaPersona_id =params['id']

      console.log("Persona", this.unaPersona_id);
      this.cargarPersonaBD()
    })
  }
  async cargarPersonaBD() {
    await this.dataBD
      .getUnaPersona(this.unaPersona_id)
      .toPromise()
      .then((data: any) => {
        this.unaPersona = data;
        console.log(this.unaPersona)
      });
  }
}
