import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { CompraCancionDto } from '../_model/CompraCancionDto';
import { VentasCancion } from '../_model/VentasCancion';

@Injectable({
  providedIn: 'root'
})
export class CompraCancionService {

  private URL: string = environment.API +  '/comprasCanciones';

  constructor(private http: HttpClient) { }

  obtenerTodos(){

    return this.http.get<CompraCancionDto[]>(this.URL + "/obtenerTodos");

  }

  obtenerPorId(id: number){

    return this.http.get<CompraCancionDto>(this.URL + "/obtenerPorId/" + id);

  }

  crear(compraCancion: CompraCancionDto){

    return this.http.post(this.URL + "/crear", compraCancion);

  }

  editar(compraCancion: CompraCancionDto){

    return this.http.put(this.URL + "/editar", compraCancion);

  }

  eliminar(id: number){

    return this.http.delete(this.URL + "/eliminar/" + id);

  }

  retirarCancion(idCancion: number, idCompra: number){

    return this.http.delete(this.URL + "/retirarCancion/" + idCancion + "/" + idCompra);

  }

  obtenerVentas(){

    return this.http.get<VentasCancion[]>(this.URL + "/obtenerVentas");

  }

}
