import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { FormatoDto } from '../_model/FormatoDto';

@Injectable({
  providedIn: 'root'
})
export class FormatoService {

  private URL: string = environment.API +  '/formatos';

  constructor(private http: HttpClient) { }

  obtenerTodos(){

    return this.http.get<FormatoDto[]>(this.URL + "/obtenerTodos");

  }

  obtenerPorId(id: number){

    return this.http.get<FormatoDto>(this.URL + "/obtenerPorId/" + id);

  }

  crear(formato: FormatoDto){

    return this.http.post(this.URL + "/crear", formato);

  }

  editar(formato: FormatoDto){

    return this.http.put(this.URL + "/editar", formato);

  }

  eliminar(id: number){

    return this.http.delete(this.URL + "/eliminar/" + id);

  }

}
