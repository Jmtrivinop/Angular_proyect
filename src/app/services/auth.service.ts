import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { URL_LOCAL } from '../config/url.servicios';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url =  `${URL_LOCAL}/user`;  

  userToken: string | null = '';

  constructor(private http: HttpClient) {
  
  }


  login(email: string, password: string) {
    const authData = { email, password };

    return this.http.post(`${this.url}/login`, authData).pipe(
      map((resp: any) => {
        console.log('Token generado: ', resp.token);
        this.guardarToken(resp.token);
        return resp;
      })
    );
  }

  guardarToken(token: string) {
    this.userToken = token;
    localStorage.setItem('token', token);
  }


  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');  
    return !!token;  
  }
  

  logout() {
    localStorage.removeItem('token');
    this.userToken = '';
  }
}
