import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { CompraDiscoDto } from '../_model/CompraDiscoDto';
import { VentasDisco } from '../_model/VentasDisco';

@Injectable({
  providedIn: 'root'
})
export class CompraDiscoServiceService {

  private URL: string = environment.API +  '/comprasDiscos';

  constructor(private http: HttpClient) { }

  obtenerTodos(){

    return this.http.get<CompraDiscoDto[]>(this.URL + "/obtenerTodos");

  }

  obtenerPorId(id: number){

    return this.http.get<CompraDiscoDto>(this.URL + "/obtenerPorId/" + id);

  }

  crear(compraDisco: CompraDiscoDto){

    return this.http.post(this.URL + "/crear", compraDisco);

  }

  editar(compraDisco: CompraDiscoDto){

    return this.http.put(this.URL + "/editar", compraDisco);

  }

  eliminar(id: number){

    return this.http.delete(this.URL + "/eliminar/" + id);

  }

  retirarDisco(idDisco: number, idCompra: number){

    return this.http.delete(this.URL + "/retirarDisco/" + idDisco + "/" + idCompra);

  }

  obtenerVentas(){

    return this.http.get<VentasDisco[]>(this.URL + "/obtenerVentas");

  }

}
