import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';

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

  cerrarSesion() {

    sessionStorage.removeItem("usuario");
    this.router.navigate(["/"])

  }

}
