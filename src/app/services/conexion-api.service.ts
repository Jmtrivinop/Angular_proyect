import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_LOCAL } from '../config/url.servicios';
import { catchError, map } from 'rxjs';
import { Persona } from '../interfaces/persona.interface';
import { Usuario } from '../interfaces/usuario.interface';
import { RouterLink } from '@angular/router';
import { Ciudad } from '../interfaces/ciudad.interface';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class ConexionApiService {
  userToken: any;
  

  constructor(public http:HttpClient) {
    this.userToken = this.leerToken();
   }
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
  getUsuarios(): any {
    
    let url = `${URL_LOCAL}/user`;




    return this.http.get(url).pipe(
      map((resp:any) => {
        console.log('DATOS', resp);
        return resp.data;
      })
    );
  }
  getUnUsuario(unIdUsuario:number): any {
   
    let url = `${URL_LOCAL}/user/${unIdUsuario}`;




    return this.http.get(url).pipe(
      map((resp:any) => {
        console.log('DATOS', resp);
        return resp.data;
      })
    );
  }
  crud_usuarios(unUsuario: Usuario, unaAccion: string): any {
    const token = this.leerToken();
  
    if (!token) {
      Swal.fire({
        icon: 'error',
        title: 'Error de autenticación',
        text: 'Token no encontrado, el usuario no está autenticado',
      });
      return; // O retornar un observable con un error
    }
  
    const headers_object = new HttpHeaders().set('x-token', token);
  
    if (unaAccion === 'eliminar') {
      let url = `${URL_LOCAL}/user/${unUsuario.id_usuario}`;
  
      return this.http.delete(url, { headers: headers_object }).pipe(
        map((data) => {
          Swal.fire({
            icon: 'success',
            title: 'Usuario eliminado',
            text: 'El usuario ha sido eliminado exitosamente.',
          });
          return data;
        }),
        catchError(error => {
          Swal.fire({
            icon: 'error',
            title: 'Error al eliminar',
            text: 'No se pudo eliminar el usuario. Intenta de nuevo.',
          });
          throw error;
        })
      );
    }
  
    if (unaAccion === 'insertar') {
      let url = `${URL_LOCAL}/user`;
  
      const body = {
        email: unUsuario.email,
        password: unUsuario.password,
        rol: unUsuario.rol,
        estado: unUsuario.estado,
        id_persona: unUsuario.id_persona,
      };
  
      return this.http.post(url, body, { headers: headers_object }).pipe(
        map((data) => {
          Swal.fire({
            icon: 'success',
            title: 'Usuario insertado',
            text: 'El usuario ha sido creado exitosamente.',
          });
          return data;
        }),
        catchError(error => {
          Swal.fire({
            icon: 'error',
            title: 'Error al insertar',
            text: 'No se pudo crear el usuario. Intenta de nuevo.',
          });
          throw error;
        })
      );
    }
  
    if (unaAccion === 'modificar') {
      let url = `${URL_LOCAL}/user/${unUsuario.id_usuario}`;
  
      const body = {
        email: unUsuario.email,
        password: unUsuario.password,
        rol: unUsuario.rol,
        estado: unUsuario.estado,
        id_persona: unUsuario.id_persona,
      };
  
      return this.http.put(url, body, { headers: headers_object }).pipe(
        map((data) => {
          Swal.fire({
            icon: 'success',
            title: 'Usuario modificado',
            text: 'El usuario ha sido modificado exitosamente.',
          });
          return data;
        }),
        catchError(error => {
          Swal.fire({
            icon: 'error',
            title: 'Error al modificar',
            text: 'No se pudo modificar el usuario. Intenta de nuevo.',
          });
          throw error;
        })
      );
    }
  }
  
  getCiudades(): any {
    let url = `${URL_LOCAL}/ciudad`;




    return this.http.get(url).pipe(
      map((resp:any) => {
        console.log('DATOS', resp);
        return resp.data;
      })
    );
  }
  getUnaCiudad(unIdCiudad:number): any {
    let url = `${URL_LOCAL}/ciudad/${unIdCiudad}`;




    return this.http.get(url).pipe(
      map((resp:any) => {
        console.log('DATOS', resp);
        return resp.data;
      })
    );
  }
  crud_ciudades(unaCiudad: Ciudad, unaAccion: string):any {
  
    if (unaAccion === 'eliminar') {
      let parametros2 = new HttpParams();

      let url = `${URL_LOCAL}/ciudad/${unaCiudad.id_ciudad}`;

      return this.http.delete(url).pipe(
        map((data) => {
          return data;
        })
      );
    }

    if (unaAccion === 'insertar') {
      
  
      let url = URL_LOCAL+ '/ciudad';

     

      const body = {
        nombre:unaCiudad.nombre,
        pais:unaCiudad.pais,
      
      };

      return this.http.post(url, body).pipe(map((data) => data));
    }

    if (unaAccion === 'modificar') {
      
      

      let url = `${URL_LOCAL}/ciudad/${unaCiudad.id_ciudad}`;



      const body = {
        nombre:unaCiudad.nombre,
        pais:unaCiudad.pais,
      };

      //console.log(parametros);
      return this.http.put(url, body).pipe(map((data) => data));
    }
  }
  public leerToken() {
    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }

    //console.log(this.userToken);

    return this.userToken;
  }


}
