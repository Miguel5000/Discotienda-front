import { Byte } from '@angular/compiler/src/util';
import { CreadorDiscoDto } from './CreadorDiscoDto';
import { GeneroDto } from './GeneroDto';
import { PaisDto } from './PaisDto';

export class ArtistaDto{

    id: number;
    idLugar: number;
    idGrupo: number;
    nombres: string;
    apellidos: string;
    nombreArtistico: string;
    fechaDeNacimiento: string;
    foto?: string;
    fotoEnBytes: Byte[];
    creaciones: CreadorDiscoDto[];
    genero: GeneroDto;
    pais: PaisDto;

}