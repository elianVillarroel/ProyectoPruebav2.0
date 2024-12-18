import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Router  } from '@angular/router';

import { FormsModule } from '@angular/forms'; // Importar FormsModule para [(ngModel)]
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-iniciosesion',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './iniciosesion.component.html',
  styleUrls: ['./iniciosesion.component.css']
})
export class IniciosesionComponent {

  nombre:string = '';
  contrasena:string = '';
  mensajeError = '';

  constructor(private authService: AuthService,private router: Router) {}
  iniciarSesion() {
    const usuario = {
      nombre: this.nombre,
      contrasena: this.contrasena
    };
    this.authService.login(usuario).subscribe(
      (respuesta) => {

        console.log('Inicio de sesión exitoso:', respuesta);
        this.router.navigate(['/bienvenidoreg']);


      },
      (error) => {

        console.error('Error al iniciar sesión:', error);
        this.mensajeError = 'Usuario o contraseña incorrectos.';
        alert(this.mensajeError);
      }
    );
  }
}
