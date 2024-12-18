import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/usuario'; // Tu API base

  constructor(private http: HttpClient) {}

  // Método para iniciar sesión
  login(usuario: { nombre: string, contrasena: string }): Observable<any> 
  {
    return this.http.post('http://localhost:3000/usuario/login', usuario);
  }

  // Método para registrar un nuevo usuario
  registrarusuario(usuario: { nombre: string; contrasena: string; email: string; numcontacto: number; tipousuario: string }): Observable<any> 
  {
    return this.http.post('http://localhost:3000/usuario',usuario);
  }

  //Metodo para registrar un nuevo evento
  registrarevento(evento: { nombre: string; tipo_evento: string; descripcion: string; id_usuario: string; id_espacio:string; fecha_evento:string; capacidad_personas: number; hora_inicio:number; hora_fin:number }):Observable<any>
  {
    return this.http.post('http://localhost:3000/evento',evento);
  }

  
  //Metodo para registrar un nuevo espacio
  registrarespacio(espacio: { nombre: string; ubicacion:string; costo: number }):Observable<any>
  {
    return this.http.post('http://localhost:3000/espacio',espacio);
  }

}

