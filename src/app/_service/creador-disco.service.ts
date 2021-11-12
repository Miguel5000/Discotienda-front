import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { CreadorDiscoDto } from '../_model/CreadorDiscoDto';

@Injectable({
  providedIn: 'root'
})
export class CreadorDiscoService {

  private URL: string = environment.API +  '/creadoresDiscos';

  constructor(private http: HttpClient) { }

  obtenerTodos(){

    return this.http.get<CreadorDiscoDto[]>(this.URL + "/obtenerTodos");

  }

  obtenerPorId(id: number){

    return this.http.get<CreadorDiscoDto>(this.URL + "/obtenerPorId/" + id);

  }

  crear(creacionDisco: CreadorDiscoDto){

    return this.http.post(this.URL + "/crear", creacionDisco);

  }

  editar(creacionDisco: CreadorDiscoDto){

    return this.http.put(this.URL + "/editar", creacionDisco);

  }

  eliminar(id: number){

    return this.http.delete(this.URL + "/eliminar/" + id);

  }

}
