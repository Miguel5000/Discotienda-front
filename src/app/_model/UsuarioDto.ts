import { CompraDto } from "./CompraDto";
import { RolDto } from "./RolDto";

export class UsuarioDto{

    id: number;
    nombres: string;
    apellidos: string;
    correo: string;
    clave: string;
    tokenRecuperacion: string;
    tokenCambioCorreo: string;
    nuevoCorreo: string;
    compras: CompraDto[];
    rol: RolDto;

}