import { Byte } from "@angular/compiler/src/util";
import { FormatoDto } from './FormatoDto';
import { DiscoDto } from './DiscoDto';

export class CancionDto{

    id: number;
    nombre: string;
    precio: number;
    descripcion: string;
    duracion: string;
    formato: FormatoDto;
    disco: DiscoDto;
    portada: string;
    portadaEnBytes: Byte[];

}