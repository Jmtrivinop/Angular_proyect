import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_LOCAL } from '../config/url.servicios';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConexionApiService {

  constructor(public http:HttpClient) { }
  getPersonas(): any {
    let url = `${URL_LOCAL}/personas`;




    return this.http.get(url).pipe(
      map((data:any) => {
        console.log('DATOS', data);
        return data.results;
      })
    );
  }
  
}
