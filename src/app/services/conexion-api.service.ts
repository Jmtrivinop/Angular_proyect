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
  getUnaPersona(unIdPersona:number): any {
    let url = `${URL_LOCAL}/personas/persona/${unIdPersona}`;




    return this.http.get(url).pipe(
      map((resp:any) => {
        console.log('DATOS', resp);
        return resp.data;
      })
    );
  }
  crud_Personas(unaPersona: Persona, unaAccion: string):any {
  
    if (unaAccion === 'eliminar') {
      let parametros2 = new HttpParams();

      let url = `${URL_LOCAL}/personas/${unaPersona.id_persona}`;

      return this.http.delete(url).pipe(
        map((data) => {
          return data;
        })
      );
    }

    if (unaAccion === 'insertar') {
      
      //let parametros2 = new HttpParams();
      let url = URL_LOCAL+ '/personas';

     

      const body = {
        nombre:unaPersona.nombre,
        apellido:unaPersona.apellido,
        fecha_nacimiento:unaPersona.fecha_nacimiento,
        Tipo_documento: unaPersona.Tipo_documento,
        'Numero Documento':unaPersona['Numero Documento']
      };

      return this.http.post(url, body).pipe(map((data) => data));
    }

    if (unaAccion === 'modificar') {
      


      let url = `${URL_LOCAL}/personas/${unaPersona.id_persona}`;



      const body = {
        nombre:unaPersona.nombre,
        apellido:unaPersona.apellido,
        fecha_nacimiento:unaPersona.fecha_nacimiento,
        Tipo_documento: unaPersona.Tipo_documento,
        'Numero Documento':unaPersona['Numero Documento']
      };

      //console.log(parametros);
      return this.http.put(url, body).pipe(map((data) => data));
    }
  }
  
}
