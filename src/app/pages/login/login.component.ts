import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = ''; 

  constructor(private authService: AuthService, private router: Router) {}  

  onLogin() {
    this.authService.login(this.email, this.password).subscribe(
      resp => {
        Swal.fire({
          icon: 'success',
          title: 'Login exitoso',
          text: 'Redirigiendo a la página de usuario...',
          showConfirmButton: false,
          timer: 1500
        });
        
        this.authService.guardarToken(resp.token);
        this.router.navigateByUrl('/usuario');
      },
      error => {
        console.error('Error en login', error);
        
        // Mostrar alerta de error con SweetAlert2
        Swal.fire({
          icon: 'error',
          title: 'Error de autenticación',
          text: 'Credenciales incorrectas o error en el servidor',
          confirmButtonText: 'Intentar de nuevo'
        });
        
        this.errorMessage = 'Credenciales incorrectas o error en el servidor'; 
      }
    );
  }
}
