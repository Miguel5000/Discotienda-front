import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarArtistasComponent } from './components/Artista/agregar-artistas/agregar-artistas.component';
import { GestionarArtistasComponent } from './components/Artista/gestionar-artistas/gestionar-artistas.component';
import { AgregarCancionesComponent } from './components/Cancion/agregar-canciones/agregar-canciones.component';
import { GestionarCancionesComponent } from './components/Cancion/gestionar-canciones/gestionar-canciones.component';
import { CarritoComponent } from './components/Compra/carrito/carrito.component';
import { HistorialComponent } from './components/Compra/historial/historial.component';
import { PagoComponent } from './components/Compra/pago/pago.component';
import { AgregarDiscosComponent } from './components/Disco/agregar-discos/agregar-discos.component';
import { GestionarDiscosComponent } from './components/Disco/gestionar-discos/gestionar-discos.component';
import { IniciarSesionComponent } from './components/Invitado/iniciar-sesion/iniciar-sesion.component';
import { PaginaInicioComponent } from './components/Invitado/pagina-inicio/pagina-inicio.component';
import { RecuperarClaveComponent } from './components/Invitado/recuperar-clave/recuperar-clave.component';
import { RegistroComponent } from './components/Invitado/registro/registro.component';
import { RestablecerClaveComponent } from './components/Invitado/restablecer-clave/restablecer-clave.component';
import { CambiarClaveComponent } from './components/Usuario/cambiar-clave/cambiar-clave.component';
import { ModificarDatosComponent } from './components/Usuario/modificar-datos/modificar-datos.component';


const routes: Routes = [

  {path: '', component: PaginaInicioComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'iniciarSesion', component: IniciarSesionComponent},
  {path: 'recuperarClave', component: RecuperarClaveComponent},
  {path: 'restablecerClave', component: RestablecerClaveComponent},
  {path: 'cambiarClave', component: CambiarClaveComponent},
  {path: 'modificarDatos', component: ModificarDatosComponent},
  {path: 'agregarArtistas', component: AgregarArtistasComponent},
  {path: 'editarArtista/:id', component: AgregarArtistasComponent},
  {path: 'gestionarArtistas', component: GestionarArtistasComponent},
  {path: 'agregarCanciones/:id', component: AgregarCancionesComponent},
  {path: 'editarCancion/:id', component: AgregarCancionesComponent},
  {path: 'gestionarCanciones/:id', component: GestionarCancionesComponent},
  {path: 'agregarDiscos/:id', component: AgregarDiscosComponent},
  {path: 'editarDisco/:id', component: AgregarDiscosComponent},
  {path: 'gestionarDiscos/:id', component: GestionarDiscosComponent},
  {path: 'carrito', component: CarritoComponent},
  {path: 'historialArtistas', component: HistorialComponent},
  {path: 'historialCanciones', component: HistorialComponent},
  {path: 'historialDiscos', component: HistorialComponent},
  {path: 'pagos', component: PagoComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 



}
