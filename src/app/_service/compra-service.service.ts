import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { CompraDto } from '../_model/CompraDto';
import { Carrito } from '../_model/Carrito';

@Injectable({
  providedIn: 'root'
})
export class CompraServiceService {

  private URL: string = environment.API +  '/compras';

  constructor(private http: HttpClient) { }

  obtenerTodos(){

    return this.http.get<CompraDto[]>(this.URL + "/obtenerTodos");

  }

  obtenerPorId(id: number){

    return this.http.get<CompraDto>(this.URL + "/obtenerPorId/" + id);

  }

  crear(compra: CompraDto){

    return this.http.post(this.URL + "/crear", compra);

  }

  editar(compra: CompraDto){

    return this.http.put(this.URL + "/editar", compra);

  }

  eliminar(id: number){

    return this.http.delete(this.URL + "/eliminar/" + id);

  }

  comprar(id: number){

    return this.http.put(this.URL + "/comprar/" + id, null);

  }

  obtenerCarrito(id: number){

    return this.http.get<Carrito>(this.URL + "/obtenerCarrito/" + id);

  }

}
