import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PaisDto } from '../_model/PaisDto';

@Injectable({
  providedIn: 'root'
})
export class PaisServiceService {

  private URL: string = environment.API +  '/paises';

  constructor(private http: HttpClient) { }

  obtenerTodos(){

    return this.http.get<PaisDto[]>(this.URL + "/obtenerTodos");

  }

  obtenerPorId(id: number){

    return this.http.get<PaisDto>(this.URL + "/obtenerPorId/" + id);

  }

  crear(pais: PaisDto){

    return this.http.post(this.URL + "/crear", pais);

  }

  editar(pais: PaisDto){

    return this.http.put(this.URL + "/editar", pais);

  }

  eliminar(id: number){

    return this.http.delete(this.URL + "/eliminar/" + id);

  }

}
