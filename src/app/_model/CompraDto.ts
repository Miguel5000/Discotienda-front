import { CompraCancionDto } from "./CompraCancionDto";
import { CompraDiscoDto } from "./CompraDiscoDto";
import { UsuarioDto } from "./UsuarioDto";

export class CompraDto{

    id: number;
    fechaCompra: string;
    valorCompra: number;
    realizacion: boolean;
    comprasCanciones: CompraCancionDto[];
    comprasDiscos: CompraDiscoDto[];
    usuario: UsuarioDto;

}