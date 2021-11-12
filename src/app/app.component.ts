import { Component } from '@angular/core';

var jquery: NodeRequire = require("../assets/jquery.js");

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'discotienda-front';
  activacionDesglose: boolean;

  constructor(){

    (<any>window).jQuery = jquery;
    (<any>window).$ = jquery;
    var nicepage: NodeRequire = require("../assets/nicepage.js");
    this.activacionDesglose = false;

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

}
