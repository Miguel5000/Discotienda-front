import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioDto } from './_model/UsuarioDto';

var jquery: NodeRequire = require("../assets/jquery.js");

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck{

  title = 'discotienda-front';
  activacionDesglose: boolean;
  sesionIniciada: boolean;
  rol: string;

  constructor(private router: Router){

    (<any>window).jQuery = jquery;
    (<any>window).$ = jquery;
    var nicepage: NodeRequire = require("../assets/nicepage.js");
    this.activacionDesglose = false;

  }

  ngDoCheck(): void {

    let jsonUsuario: string | null = sessionStorage.getItem("usuario");
    if (jsonUsuario == null) {
      this.sesionIniciada = false;
    } else {
      this.sesionIniciada = true;
      this.rol = (JSON.parse(jsonUsuario) as UsuarioDto).rol.nombre;
    }

  }

  desglose() {

    if (this.activacionDesglose == true) {
      this.activacionDesglose = false;
    } else {
      this.activacionDesglose = true;
    }

  }

  onResize(event: any) {
    let ancho = event.target.innerWidth;
    if (ancho > 992) {

      this.activacionDesglose = false;

    }
  }

  irAInicio(){

    if(sessionStorage.getItem("usuario") != null){

      this.router.navigate(["/gestionarArtistas"]);   

    }else{

      this.router.navigate(["/"]);   

    }

  }

  cerrarSesion() {

    sessionStorage.removeItem("usuario");
    sessionStorage.removeItem("idArtista");
    sessionStorage.removeItem("idDisco");
    this.router.navigate(["/"]);

  }

}
