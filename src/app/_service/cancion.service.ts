import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { CancionDto } from '../_model/CancionDto';

@Injectable({
  providedIn: 'root'
})
export class CancionService {

  private URL: string = environment.API +  '/canciones';

  constructor(private http: HttpClient) { }

  obtenerTodos(){

    return this.http.get<CancionDto[]>(this.URL + "/obtenerTodos");

  }

  obtenerPorId(id: number){

    return this.http.get<CancionDto>(this.URL + "/obtenerPorId/" + id);

  }

  crear(cancion: CancionDto){

    return this.http.post(this.URL + "/crear", cancion);

  }

  editar(cancion: CancionDto){

    return this.http.put(this.URL + "/editar", cancion);

  }

  eliminar(id: number){

    return this.http.delete(this.URL + "/eliminar/" + id);

  }

  obtenerListaPorCompra(id: number){

    return this.http.get<CancionDto[]>(this.URL + "/obtenerListaPorCompra/" + id);

  }

  obtenerListaPorDisco(id: number){

    return this.http.get<CancionDto[]>(this.URL + "/obtenerListaPorDisco/" + id);

  }
  
}
