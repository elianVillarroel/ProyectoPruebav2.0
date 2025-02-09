import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private axiosInstance: AxiosInstance;
  private baseUrl = 'http://localhost:3000';

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: this.baseUrl,
    });
    console.log(this.axiosInstance.defaults);
  }

  /*
    Método genérico para manejar peticiones POST
  */

  private async postRequest(endpoint: string, data: any): Promise<any[]> {
    try {
      const response = await this.axiosInstance.post(endpoint, data);
      return response.data;
    } catch (error) {
      console.error(`Error al hacer POST a ${endpoint}:`, error);
      throw error;
    }
  }
  /*--------------USUARIOS---------------- */
  /*
    Obtener todos los usuarios desde el backend
   */
    async getUsuarios(usuario: any): Promise<any[]> {
      return this.postRequest('/usuario', usuario);
    }

  /*---------------EVENTOS---------------- */
  /*
    Obtener todos los eventos desde el backend
   */
  async getEventosusuarionormal(): Promise<any[]> {
    try {
      const response = await this.axiosInstance.get('/evento/eventos-Usernormal');
      return response.data;
    } catch (error) {
      console.error('Error al obtener eventos:', error);
      throw error;
    }
  }

  async getEventoscreador(): Promise<any[]> {
    try {
      const response = await this.axiosInstance.get('/evento/eventos-Creador');
      return response.data;
    } catch (error) {
      console.error('Error al obtener eventos:', error);
      throw error;
    }
  }
  async getEventosadmin(): Promise<any[]> {
    try {
      const response = await this.axiosInstance.get('/evento/eventos-Admin');
      return response.data;
    } catch (error) {
      console.error('Error al obtener eventos:', error);
      throw error;
    }
  }

  async getEventosfecha(): Promise<any[]> {
    try {
      const response = await this.axiosInstance.get('/evento/filtrar-fecha');
      return response.data;
    } catch (error) {
      console.error('Error al obtener eventos:', error);
      throw error;
    }
  }
  async getEventospendientes(): Promise<any[]> {
    try {
      const response = await this.axiosInstance.get('/evento/eventos-pend');
      return response.data;
    } catch (error) {
      console.error('Error al obtener eventos:', error);
      throw error;
    }
  }

  /*---------------ESPACIOS---------------- */
    /*
      Obtener todos los espacios desde el backend
     */
      async getEspacios(espacio: any): Promise<any[]> {
        return this.postRequest('/espacio', espacio);
      }

  /*---------------PETICIONES---------------- */
    /* 
       Obtener todos los peticiones desde el backend
      */
      async getPeticiones(peticiones: any): Promise<any[]> {
        return this.postRequest('/peticiones', peticiones);
      }
}
