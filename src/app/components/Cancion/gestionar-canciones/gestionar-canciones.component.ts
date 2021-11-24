import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Carrito } from 'src/app/_model/Carrito';
import { CompraCancionDto } from 'src/app/_model/CompraCancionDto';
import { CompraDto } from 'src/app/_model/CompraDto';
import { UsuarioDto } from 'src/app/_model/UsuarioDto';
import { CancionService } from 'src/app/_service/cancion.service';
import { CompraCancionService } from 'src/app/_service/compra-cancion.service';
import { CompraService } from 'src/app/_service/compra.service';
import { DiscoService } from 'src/app/_service/disco.service';

@Component({
  selector: 'app-gestionar-canciones',
  templateUrl: './gestionar-canciones.component.html',
  styleUrls: ['./gestionar-canciones.component.css']
})
export class GestionarCancionesComponent implements OnInit {

  discoInterfaz: DiscoInterfaz = new DiscoInterfaz();
  cancionesInterfaz: CancionInterfaz[] = [];
  cancionesInterfazFiltradas: CancionInterfaz[] = [];
  idDisco: number;
  rol: string;
  carrito: Carrito;
  existenciaCarrito: boolean[] = [];

  constructor(private route: ActivatedRoute,
    private discoService: DiscoService,
    private cancionService: CancionService,
    private router: Router,
    private snackBar: MatSnackBar,
    private compraService: CompraService,
    private compraCancionService: CompraCancionService) { }

  ngOnInit(): void {

    let usuarioSession = sessionStorage.getItem("usuario");

    if (usuarioSession != null) {

      let usuario: UsuarioDto = JSON.parse(usuarioSession);
      this.rol = usuario.rol.nombre;

    }


    this.route.params.subscribe(params => {

      this.idDisco = params['id'];

      this.actualizar();

    });

  }

  filtrar(event: Event) {

    let elemento: HTMLInputElement = event.target as HTMLInputElement;
    let valor = elemento.value.toLowerCase();
    this.cancionesInterfazFiltradas = this.cancionesInterfaz.filter(cancion => cancion.nombre.toLowerCase().includes(valor) ||
      cancion.precio.toString().toLowerCase().includes(valor) || cancion.duracion.toLowerCase().includes(valor) || cancion.formato.toLowerCase().includes(valor) ||
      cancion.descripcion.toLowerCase().includes(valor));

  }

  agregar() {

    this.router.navigate(["/agregarCanciones", this.idDisco]);

  }

  actualizar() {

    this.cancionesInterfaz = [];
    this.cancionesInterfazFiltradas = [];
    this.existenciaCarrito = [];

    let usuarioJson = sessionStorage.getItem("usuario");

    if (usuarioJson != null) {

      let usuario: UsuarioDto = JSON.parse(usuarioJson);

      this.compraService.obtenerCarrito(usuario.id).subscribe(carrito => {

        this.carrito = carrito;

        this.discoService.obtenerPorId(this.idDisco).subscribe(disco => {

          this.discoInterfaz.descripcion = disco.descripcion;
          let fechaConvertida: Date = new Date(disco.fechaDeLanzamiento);
          fechaConvertida.setDate(fechaConvertida.getDate() + 1);
          this.discoInterfaz.fechaDeLanzamiento = new Date(fechaConvertida).toLocaleString().split(",")[0];
          this.discoInterfaz.nombre = disco.nombre;
          this.discoInterfaz.precio = disco.precio;
          if (disco.portada != undefined) {
            this.discoInterfaz.portada = disco.portada;
          }

          if (this.discoInterfaz.portada == null || this.discoInterfaz.portada == "") {

            this.discoInterfaz.portada = "assets/imagenes/DiscoNulo.png";

          }

          this.cancionService.obtenerListaPorDisco(disco.id).subscribe(canciones => {

            canciones.forEach(cancion => {

              let cancionInterfaz: CancionInterfaz = new CancionInterfaz();
              cancionInterfaz.id = cancion.id;
              cancionInterfaz.descripcion = cancion.descripcion;
              cancionInterfaz.duracion = cancion.duracion.split(":")[0] + ":" + cancion.duracion.split(":")[1];
              cancionInterfaz.formato = cancion.formato.nombre;
              cancionInterfaz.nombre = cancion.nombre;
              cancionInterfaz.portada = cancion.portada;
              cancionInterfaz.precio = cancion.precio;

              if (cancionInterfaz.portada == null || cancionInterfaz.portada == "") {

                cancionInterfaz.portada = "assets/imagenes/CanciónNula.png";

              }

              this.cancionesInterfaz.push(cancionInterfaz);
              this.cancionesInterfazFiltradas.push(cancionInterfaz);

              if (this.carrito.canciones.filter(cancionF => cancionF.id == cancion.id).length > 0) {

                this.existenciaCarrito.push(true);

              } else {

                this.existenciaCarrito.push(false);
              }


            });

          })

        })

      }, err => {

        this.discoService.obtenerPorId(this.idDisco).subscribe(disco => {

          this.discoInterfaz.descripcion = disco.descripcion;
          let fechaConvertida: Date = new Date(disco.fechaDeLanzamiento);
          fechaConvertida.setDate(fechaConvertida.getDate() + 1);
          this.discoInterfaz.fechaDeLanzamiento = new Date(fechaConvertida).toLocaleString().split(",")[0];
          this.discoInterfaz.nombre = disco.nombre;
          this.discoInterfaz.precio = disco.precio;
          if (disco.portada != undefined) {
            this.discoInterfaz.portada = disco.portada;
          }

          if (this.discoInterfaz.portada == null || this.discoInterfaz.portada == "") {

            this.discoInterfaz.portada = "assets/imagenes/DiscoNulo.png";

          }

          this.cancionService.obtenerListaPorDisco(disco.id).subscribe(canciones => {

            canciones.forEach(cancion => {

              let cancionInterfaz: CancionInterfaz = new CancionInterfaz();
              cancionInterfaz.id = cancion.id;
              cancionInterfaz.descripcion = cancion.descripcion;
              cancionInterfaz.duracion = cancion.duracion.split(":")[0] + ":" + cancion.duracion.split(":")[1];
              cancionInterfaz.formato = cancion.formato.nombre;
              cancionInterfaz.nombre = cancion.nombre;
              cancionInterfaz.portada = cancion.portada;
              cancionInterfaz.precio = cancion.precio;

              if (cancionInterfaz.portada == null || cancionInterfaz.portada == "") {

                cancionInterfaz.portada = "assets/imagenes/CanciónNula.png";

              }

              this.cancionesInterfaz.push(cancionInterfaz);
              this.cancionesInterfazFiltradas.push(cancionInterfaz);

            });

          })

        })

      });

    }

  }

  editar(cancionInterfaz: CancionInterfaz) {

    sessionStorage.setItem("idDisco", this.idDisco.toString());
    this.router.navigate(["/editarCancion", cancionInterfaz.id]);

  }

  eliminar(cancionInterfaz: CancionInterfaz) {

    this.cancionService.eliminar(cancionInterfaz.id).subscribe(data => {

      this.actualizar();
      this.snackBar.open("Canción eliminada con éxito", "cerrar", { duration: 3000 });

    });

  }

  agregarAlCarrito(cancionInterfaz: CancionInterfaz) {

    let usuarioJson = sessionStorage.getItem("usuario");

    if (usuarioJson != null) {

      let usuario: UsuarioDto = JSON.parse(usuarioJson);

      if (this.carrito != null) {

        this.compraService.obtenerCompraCarrito(usuario.id).subscribe(compra => {

          this.cancionService.obtenerPorId(cancionInterfaz.id).subscribe(cancion => {

            let compraCancion: CompraCancionDto = new CompraCancionDto();
            compraCancion.compra = compra;
            compraCancion.cancion = cancion;
            this.compraCancionService.crear(compraCancion).subscribe(data => {

              this.snackBar.open("La canción se ha agregado al carrito", "cerrar", { duration: 3000 });
              this.actualizar();

            })

          })

        })

      } else {

        let compraCarrito: CompraDto = new CompraDto();
        let fechaActual = new Date();
        compraCarrito.fechaCompra = fechaActual.getFullYear() + "-" + (fechaActual.getMonth() + 1) + "-" + fechaActual.getDate() + "T" + fechaActual.getHours() + ":" + fechaActual.getMinutes() + ":00.000";
        compraCarrito.realizacion = false;
        compraCarrito.valorCompra = 1;
        compraCarrito.usuario = usuario;

        this.compraService.crear(compraCarrito).subscribe(data => {
          this.carrito = new Carrito();
          this.agregarAlCarrito(cancionInterfaz);
        });

      }

    }

  }

  comprobarExistencia(cancionInterfaz: CancionInterfaz) {

    if (this.carrito != null) {

      let indice: number = this.cancionesInterfaz.indexOf(cancionInterfaz);
      return this.existenciaCarrito[indice];

    } else {

      return false;

    }

  }

}

class DiscoInterfaz {

  nombre: string;
  fechaDeLanzamiento: string;
  precio: number;
  descripcion: string;
  portada: string;

}

class CancionInterfaz {

  id: number;
  nombre: string;
  precio: number;
  duracion: string;
  formato: string;
  descripcion: string;
  portada: string;

}
