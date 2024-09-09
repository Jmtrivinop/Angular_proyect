import { Component } from '@angular/core';
import { ConexionApiService } from '../../services/conexion-api.service';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrl: './personas.component.css'
})
export class PersonasComponent {
  
  constructor(
    private dataBD: ConexionApiService,
    
  )
}
