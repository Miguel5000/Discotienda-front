import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { PaginaInicioComponent } from './components/Invitado/pagina-inicio/pagina-inicio.component';
import { IniciarSesionComponent } from './components/Invitado/iniciar-sesion/iniciar-sesion.component';
import { RegistroComponent } from './components/Invitado/registro/registro.component';
import { RecuperarClaveComponent } from './components/Invitado/recuperar-clave/recuperar-clave.component';
import { RestablecerClaveComponent } from './components/Invitado/restablecer-clave/restablecer-clave.component';
import { ModificarDatosComponent } from './components/Usuario/modificar-datos/modificar-datos.component';
import { CambiarClaveComponent } from './components/Usuario/cambiar-clave/cambiar-clave.component';
import { AgregarArtistasComponent } from './components/Artista/agregar-artistas/agregar-artistas.component';
import { GestionarArtistasComponent } from './components/Artista/gestionar-artistas/gestionar-artistas.component';
import { AgregarCancionesComponent } from './components/Cancion/agregar-canciones/agregar-canciones.component';
import { GestionarCancionesComponent } from './components/Cancion/gestionar-canciones/gestionar-canciones.component';
import { AgregarDiscosComponent } from './components/Disco/agregar-discos/agregar-discos.component';
import { GestionarDiscosComponent } from './components/Disco/gestionar-discos/gestionar-discos.component';
import { PagoComponent } from './components/Compra/pago/pago.component';
import { HistorialComponent } from './components/Compra/historial/historial.component';
import { CarritoComponent } from './components/Compra/carrito/carrito.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidacionComponent } from './components/Utilitarios/validacion/validacion.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';


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
    CarritoComponent,
    ValidacionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    NoopAnimationsModule,
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
