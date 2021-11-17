import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UsuarioDto } from '../_model/UsuarioDto';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private URL: string = environment.API +  '/usuarios';

  constructor(private http: HttpClient) { }

  obtenerTodos(){

    return this.http.get<UsuarioDto[]>(this.URL + "/obtenerTodos");

  }

  obtenerPorId(id: number){

    return this.http.get<UsuarioDto>(this.URL + "/obtenerPorId/" + id);

  }

  crear(usuario: UsuarioDto){

    return this.http.post(this.URL + "/crear", usuario);

  }

  editar(usuario: UsuarioDto){

    return this.http.put(this.URL + "/editar", usuario);

  }

  eliminar(id: number){

    return this.http.delete(this.URL + "/eliminar/" + id);

  }

  iniciarSesion(correo: string, clave: string){

    return this.http.get<UsuarioDto>(this.URL + "/iniciarSesion/" + correo + "/" + clave);

  }

  enviarCorreoRecuperacion(correo: string){

    return this.http.put(this.URL + "/enviarCorreoRecuperacion/" + correo, null);

  }

  recuperarClave(token: string, clave: string){

    return this.http.put(this.URL + "/recuperarClave/" + token + "/" + clave, null);

  }

  enviarCorreoValidacion(correo: string){

    return this.http.put(this.URL + "/enviarCorreoValidacion/" + correo, null);

  }

  modificarCorreo(token: string){

    return this.http.put(this.URL + "/modificarCorreo/" + token, null);

  }

}
