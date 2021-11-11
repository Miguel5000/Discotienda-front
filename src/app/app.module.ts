import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PaginaInicioComponent } from './components/invitado/pagina-inicio/pagina-inicio.component';
import { IniciarSesionComponent } from './components/invitado/iniciar-sesion/iniciar-sesion.component';
import { RegistroComponent } from './components/invitado/registro/registro.component';
import { RecuperarClaveComponent } from './components/invitado/recuperar-clave/recuperar-clave.component';
import { RestablecerClaveComponent } from './components/invitado/restablecer-clave/restablecer-clave.component';
import { ModificarDatosComponent } from './components/usuario/modificar-datos/modificar-datos.component';
import { CambiarClaveComponent } from './components/usuario/cambiar-clave/cambiar-clave.component';
import { AgregarArtistasComponent } from './components/artista/agregar-artistas/agregar-artistas.component';
import { GestionarArtistasComponent } from './components/artista/gestionar-artistas/gestionar-artistas.component';
import { AgregarCancionesComponent } from './components/cancion/agregar-canciones/agregar-canciones.component';
import { GestionarCancionesComponent } from './components/cancion/gestionar-canciones/gestionar-canciones.component';
import { AgregarDiscosComponent } from './components/disco/agregar-discos/agregar-discos.component';
import { GestionarDiscosComponent } from './components/disco/gestionar-discos/gestionar-discos.component';
import { PagoComponent } from './components/compra/pago/pago.component';
import { HistorialComponent } from './components/compra/historial/historial.component';
import { CarritoComponent } from './components/compra/carrito/carrito.component';

@NgModule({
  declarations: [
    AppComponent,
    PaginaInicioComponent,
    IniciarSesionComponent,
    RegistroComponent,
    RecuperarClaveComponent,
    RestablecerClaveComponent,
    ModificarDatosComponent,
    CambiarClaveComponent,
    AgregarArtistasComponent,
    GestionarArtistasComponent,
    AgregarCancionesComponent,
    GestionarCancionesComponent,
    AgregarDiscosComponent,
    GestionarDiscosComponent,
    PagoComponent,
    HistorialComponent,
    CarritoComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
