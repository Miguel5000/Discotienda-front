import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RolDto } from '../_model/RolDto';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  private URL: string = environment.API +  '/roles';

  constructor(private http: HttpClient) { }

  obtenerTodos(){

    return this.http.get<RolDto[]>(this.URL + "/obtenerTodos");

  }

  obtenerPorId(id: number){

    return this.http.get<RolDto>(this.URL + "/obtenerPorId/" + id);

  }

  crear(rol: RolDto){

    return this.http.post(this.URL + "/crear", rol);

  }

  editar(rol: RolDto){

    return this.http.put(this.URL + "/editar", rol);

  }

  eliminar(id: number){

    return this.http.delete(this.URL + "/eliminar/" + id);

  }

}
