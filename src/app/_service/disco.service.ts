import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { DiscoDto } from '../_model/DiscoDto';

@Injectable({
  providedIn: 'root'
})
export class DiscoService {

  private URL: string = environment.API +  '/discos';

  constructor(private http: HttpClient) { }

  obtenerTodos(){

    return this.http.get<DiscoDto[]>(this.URL + "/obtenerTodos");

  }

  obtenerPorId(id: number){

    return this.http.get<DiscoDto>(this.URL + "/obtenerPorId/" + id);

  }

  obtenerPorArtista(id: number){

    return this.http.get<DiscoDto[]>(this.URL + "/obtenerPorArtista/" + id);

  }

  crear(disco: DiscoDto){

    return this.http.post(this.URL + "/crear", disco);

  }

  editar(disco: DiscoDto){

    return this.http.put(this.URL + "/editar", disco);

  }

  eliminar(id: number){

    return this.http.delete(this.URL + "/eliminar/" + id);

  }

}
