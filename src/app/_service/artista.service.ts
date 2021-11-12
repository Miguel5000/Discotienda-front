import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ArtistaDto } from '../_model/ArtistaDto';
import { VentasArtista } from '../_model/VentasArtista';

@Injectable({
  providedIn: 'root'
})
export class ArtistaService {

  private URL: string = environment.API +  '/artistas';

  constructor(private http: HttpClient) { }

  obtenerTodos(){

    return this.http.get<ArtistaDto[]>(this.URL + "/obtenerTodos");

  }

  obtenerPorId(id: number){

    return this.http.get<ArtistaDto>(this.URL + "/obtenerPorId/" + id);

  }

  crear(artista: ArtistaDto){

    return this.http.post(this.URL + "/crear", artista);

  }

  editar(artista: ArtistaDto){

    return this.http.put(this.URL + "/editar", artista);

  }

  eliminar(id: number){

    return this.http.delete(this.URL + "/eliminar/" + id);

  }

  obtenerVentas(){

    return this.http.get<VentasArtista[]>(this.URL + "/obtenerVentas");

  }

}
