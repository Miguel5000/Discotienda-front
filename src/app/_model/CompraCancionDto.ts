import { CancionDto } from "./CancionDto";
import { CompraDto } from "./CompraDto";

export class CompraCancionDto{

    id: number;
    compra: CompraDto;
    cancion: CancionDto;

}