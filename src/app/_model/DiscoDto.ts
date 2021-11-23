import { Byte } from "@angular/compiler/src/util";
import { CancionDto } from "./CancionDto";
import { CompraDiscoDto } from "./CompraDiscoDto";
import { CreadorDiscoDto } from "./CreadorDiscoDto";

export class DiscoDto{

    id: number;
    nombre: string;
    fechaDeLanzamiento: string;
    precio: number;
    descripcion: string;
    compras: CompraDiscoDto[];
    creaciones: CreadorDiscoDto[];
    canciones: CancionDto[];
    portada?: string;
    portadaEnBytes: Byte[];

}