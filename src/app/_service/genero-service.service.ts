import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { GeneroDto } from '../_model/GeneroDto';

@Injectable({
  providedIn: 'root'
})
export class GeneroServiceService {

  private URL: string = environment.API +  '/generos';

  constructor(private http: HttpClient) { }

  obtenerTodos(){

    return this.http.get<GeneroDto[]>(this.URL + "/obtenerTodos");

  }

  obtenerPorId(id: number){

    return this.http.get<GeneroDto>(this.URL + "/obtenerPorId/" + id);

  }

  crear(genero: GeneroDto){

    return this.http.post(this.URL + "/crear", genero);

  }

  editar(genero: GeneroDto){

    return this.http.put(this.URL + "/editar", genero);

  }

  eliminar(id: number){

    return this.http.delete(this.URL + "/eliminar/" + id);

  }

}
