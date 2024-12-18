export class EventoDto {


    nombre?: string;

    tipo_evento?: string;

    descripcion?: string;

    id_usuario?: number; 

    id_espacio?: number;

    fecha_evento?: Date;

    capacidad_personas?: number;

    hora_inicio?: number;

    hora_fin?: number;
    
    costo?:number;
}
