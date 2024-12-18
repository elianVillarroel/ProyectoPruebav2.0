import { Injectable, NotFoundException } from '@nestjs/common';
import { EspacioEntity } from './espacio.entity';
import { EspacioDto } from './dto/espacio.dto';
import { DataSource } from 'typeorm';
import { EventoEntity } from 'src/evento/evento.entity';

@Injectable()
export class EspacioService {

    private espacioRepository;
    private eventoRepository;

    constructor(private dataSource: DataSource) {
        this.espacioRepository = this.dataSource.getRepository(EspacioEntity);
        this.eventoRepository = this.dataSource.getRepository(EventoEntity);
    }

    async findid(id: number): Promise<EspacioEntity> {
        const espacio = await this.espacioRepository.findOneBy({ id });

        if (!espacio) {
            throw new NotFoundException({ message: 'espacio no encontrado/inexistente' });
        }

        return espacio;
    }

    async create(dto: EspacioDto): Promise<any> {
        const espacio = this.espacioRepository.create(dto);
        await this.espacioRepository.save(espacio);
        return { message: `Espacio ${espacio.nombre} creado exitosamente` };
    }

    async updateNombre(nombre: string, nuevoNombre: string): Promise<any> {
        const espacio = await this.espacioRepository.findOne({ where: { nombre } });
        if (!espacio) {
          throw new NotFoundException('Espacio no encontrado');
        }
        espacio.nombre = nuevoNombre;
        await this.espacioRepository.save(espacio);
        return { message: `Nombre actualizado a ${nuevoNombre}` };
    }

    async delete(nombre: string): Promise<any> {
        const espacio = await this.espacioRepository.findOne({ where: { nombre } });
        if (!espacio) {
          throw new NotFoundException('Espacio no encontrado');
        }
        await this.espacioRepository.remove(espacio);
        return { message: `Espacio: ${nombre}, eliminado` };
    }


    async getByNombre(nombre: string): Promise<EspacioEntity> {
        const espacio = await this.espacioRepository.findOne({ where: { nombre } });
        if (!espacio) {
          throw new NotFoundException('Espacio no encontrado');
        }
        return espacio;
    }

    async getespacios(): Promise<any[]>
    {
      const espacios = await this.espacioRepository.find();
      return espacios;
    }
    async findAvailableSpaces(fecha: string): Promise<any[]> 
    {
        // EVENTOS EN FECHA
        const eventos = await this.eventoRepository.find({
          where: { fecha_evento:fecha },
          relations: ['id_espacio'],
          order: {hora_inicio: 'ASC' },
        });
    
        // ESPACIOS
        const espacios = await this.espacioRepository.find();
        const espaciosDisponibles = [];
        
        // ESPACIOS CON EVENTOS
        const espaciosSet = new Set<EspacioEntity>();
        eventos.forEach(evento => {
          espaciosSet.add(evento.id_espacio);
        });
        const espacioseventos = Array.from(espaciosSet);
        
        // ESPACIOS LIBRES
        const espaciosLibres = espacios.filter(espacio => 
        !espacioseventos.some(espacioseventos => espacioseventos.id === espacio.id));

        espaciosLibres.forEach((espacio) => {
          espaciosDisponibles.push({
            espacio,
            disponibilidad: ['06:00 - 21:00'],
          });
        });

        espacioseventos.forEach((espacio) => {
          const eventosEspacio = eventos.filter((evento) => evento.id_espacio.id === espacio.id);
      
          const disponibilidad = [];
          let lastEndTime = 6; // Inicio del horario (6:00 AM)
      
          eventosEspacio.forEach((evento) => {
            if (lastEndTime < evento.hora_inicio) {
              const inicio = this.formatHora(lastEndTime);
              const fin = this.formatHora(evento.hora_inicio);
              disponibilidad.push(`${inicio} - ${fin}`);
            }
            lastEndTime = evento.hora_fin; // Actualizar la última hora de finalización
          });
      
          // Agregar disponibilidad después del último evento hasta las 21:00
          if (lastEndTime < 21) {
            disponibilidad.push(`${this.formatHora(lastEndTime)} - 21:00`);
          }
      
          espaciosDisponibles.push({
            espacio,
            disponibilidad,
          });
        });
        return espaciosDisponibles;
    }
    private formatHora(hora: number): string {
      return `${hora.toString().padStart(2, '0')}:00`;
    }
}