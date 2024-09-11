import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_LOCAL } from '../config/url.servicios';
import { map } from 'rxjs';
import { Persona } from '../interfaces/persona.interface';

@Injectable({
  providedIn: 'root'
})
export class ConexionApiService {

  constructor(public http:HttpClient) { }
  getPersonas(): any {
    let url = `${URL_LOCAL}/personas`;




    return this.http.get(url).pipe(
      map((resp:any) => {
        console.log('DATOS', resp);
        return resp.data;
      })
    );
  }
  crud_Personas(unaPersona: Persona, unaAccion: string):any {
    //console.log(unExpediente);

    if (unaAccion === 'eliminar') {

      let url = `${URL_LOCAL}/personas/${unaPersona.id_persona}`;

      return this.http.delete(url).pipe(
        map((data) => {
          return data;
        })
      );
    }

    if (unaAccion === 'insertar') {
      let parametros2 = new HttpParams();
      let url = URL_LOCAL+ '/personas';

      // Begin assigning parameters
      parametros2 = parametros2.append('nombres',unaPersona.nombre);
      parametros2 = parametros2.append('apellidos',unaPersona.apellido);
      parametros2 = parametros2.append('fecha_nacimiento',unaPersona.fecha_nacimiento);



      const body = {
        nombre:unaPersona.nombre,
        apellidos: unaPersona.apellido,
        fecha_nacimiento: unaPersona.fecha_nacimiento,

      };

      return this.http.post(url, body).pipe(map((data) => data));
    }

    if (unaAccion === 'modificar') {
      let parametros = new HttpParams();

      let url = `${URL_LOCAL}/personas/${unaPersona.id_persona}`;

      // Begin assigning parameters
      parametros = parametros.append('nombres',unaPersona.nombre);
      parametros = parametros.append('apellidos',unaPersona.apellido);
      parametros = parametros.append('fecha_nacimiento',unaPersona.fecha_nacimiento);
  
 

      const body = {
        nombre:unaPersona.nombre,
        apellidos: unaPersona.apellido,
        fecha_nacimiento: unaPersona.fecha_nacimiento,

      };

      //console.log(parametros);
      return this.http.put(url, body).pipe(map((data) => data));
    }
  }
  
}
