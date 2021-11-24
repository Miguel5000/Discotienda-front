import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Carrito } from 'src/app/_model/Carrito';
import { CompraDiscoDto } from 'src/app/_model/CompraDiscoDto';
import { CompraDto } from 'src/app/_model/CompraDto';
import { UsuarioDto } from 'src/app/_model/UsuarioDto';
import { ArtistaService } from 'src/app/_service/artista.service';
import { CompraDiscoService } from 'src/app/_service/compra-disco.service';
import { CompraService } from 'src/app/_service/compra.service';
import { CreadorDiscoService } from 'src/app/_service/creador-disco.service';
import { DiscoService } from 'src/app/_service/disco.service';

@Component({
  selector: 'app-gestionar-discos',
  templateUrl: './gestionar-discos.component.html',
  styleUrls: ['./gestionar-discos.component.css']
})
export class GestionarDiscosComponent implements OnInit {

  artistaInterfaz: ArtistaInterfaz = new ArtistaInterfaz();
  discosInterfaz: DiscoInterfaz[] = [];
  discosInterfazFiltrados: DiscoInterfaz[] = [];
  idArtista: number;
  rol: string;
  carrito: Carrito;
  existenciaCarrito: boolean[] = [];

  constructor(private route: ActivatedRoute,
    private artistaService: ArtistaService,
    private discoService: DiscoService,
    private creadorDiscoService: CreadorDiscoService,
    private router: Router,
    private snackBar: MatSnackBar,
    private compraService: CompraService,
    private compraDiscoService: CompraDiscoService) { }

  ngOnInit(): void {

    let usuarioSession = sessionStorage.getItem("usuario");

    if (usuarioSession != null) {

      let usuario: UsuarioDto = JSON.parse(usuarioSession);
      this.rol = usuario.rol.nombre;

    }


    this.route.params.subscribe(params => {

      this.idArtista = params['id'];

      this.actualizar();

    });

  }

  actualizar() {

    this.discosInterfaz = [];
    this.discosInterfazFiltrados = [];
    this.existenciaCarrito = [];

    let usuarioJson = sessionStorage.getItem("usuario");

    if (usuarioJson != null) {

      let usuario: UsuarioDto = JSON.parse(usuarioJson);

      this.compraService.obtenerCarrito(usuario.id).subscribe(carrito => {

        this.carrito = carrito;

        this.artistaService.obtenerPorId(this.idArtista).subscribe(artista => {

          this.artistaInterfaz = new ArtistaInterfaz();
          this.artistaInterfaz.nombre = artista.nombres + " " + artista.apellidos;
          this.artistaInterfaz.genero = artista.genero.nombre;
          this.artistaInterfaz.pais = artista.pais.nombre;
          let fechaConvertida: Date = new Date(artista.fechaDeNacimiento);
          fechaConvertida.setDate(fechaConvertida.getDate() + 1);
          this.artistaInterfaz.fecha = new Date(fechaConvertida).toLocaleString().split(",")[0];

          if (artista.foto != undefined) {
            this.artistaInterfaz.foto = artista.foto;
          }

          if (this.artistaInterfaz.foto == null || this.artistaInterfaz.foto == "") {

            this.artistaInterfaz.foto = "assets/imagenes/ArtistaNulo.png";

          }

          this.discoService.obtenerPorArtista(this.idArtista).subscribe(discos => {

            discos.forEach(disco => {

              let discoInterfaz: DiscoInterfaz = new DiscoInterfaz();
              discoInterfaz.id = disco.id;
              discoInterfaz.descripcion = disco.descripcion;
              let fechaConvertida: Date = new Date(disco.fechaDeLanzamiento);
              fechaConvertida.setDate(fechaConvertida.getDate() + 1);
              discoInterfaz.fecha = new Date(fechaConvertida).toLocaleString().split(",")[0];
              discoInterfaz.nombre = disco.nombre;
              if (disco.portada != undefined) {
                discoInterfaz.portada = disco.portada
              }
              discoInterfaz.precio = disco.precio;

              if (discoInterfaz.portada == null || discoInterfaz.portada == "") {

                discoInterfaz.portada = "assets/imagenes/DiscoNulo.png";

              }

              this.discosInterfaz.push(discoInterfaz);
              this.discosInterfazFiltrados.push(discoInterfaz);

              if (this.carrito.discos.filter(discoF => discoF.id == disco.id).length > 0) {

                this.existenciaCarrito.push(true);

              } else {

                this.existenciaCarrito.push(false);

              }

            });

          });

        });

      }, err => {

        this.artistaService.obtenerPorId(this.idArtista).subscribe(artista => {

          this.artistaInterfaz = new ArtistaInterfaz();
          this.artistaInterfaz.nombre = artista.nombres + " " + artista.apellidos;
          this.artistaInterfaz.genero = artista.genero.nombre;
          this.artistaInterfaz.pais = artista.pais.nombre;
          let fechaConvertida: Date = new Date(artista.fechaDeNacimiento);
          fechaConvertida.setDate(fechaConvertida.getDate() + 1);
          this.artistaInterfaz.fecha = new Date(fechaConvertida).toLocaleString().split(",")[0];

          if (artista.foto != undefined) {
            this.artistaInterfaz.foto = artista.foto;
          }

          if (this.artistaInterfaz.foto == null || this.artistaInterfaz.foto == "") {

            this.artistaInterfaz.foto = "assets/imagenes/ArtistaNulo.png";

          }

          this.discoService.obtenerPorArtista(this.idArtista).subscribe(discos => {

            discos.forEach(disco => {

              let discoInterfaz: DiscoInterfaz = new DiscoInterfaz();
              discoInterfaz.id = disco.id;
              discoInterfaz.descripcion = disco.descripcion;
              let fechaConvertida: Date = new Date(disco.fechaDeLanzamiento);
              fechaConvertida.setDate(fechaConvertida.getDate() + 1);
              discoInterfaz.fecha = new Date(fechaConvertida).toLocaleString().split(",")[0];
              discoInterfaz.nombre = disco.nombre;
              if (disco.portada != undefined) {
                discoInterfaz.portada = disco.portada
              }
              discoInterfaz.precio = disco.precio;

              if (discoInterfaz.portada == null || discoInterfaz.portada == "") {

                discoInterfaz.portada = "assets/imagenes/DiscoNulo.png";

              }

              this.discosInterfaz.push(discoInterfaz);
              this.discosInterfazFiltrados.push(discoInterfaz);

            });

          });

        });

      });

    }

  }

  gestionarCanciones(idDisco: number) {

    this.router.navigate(["/gestionarCanciones/", idDisco]);

  }

  filtrar(event: Event) {

    let elemento: HTMLInputElement = event.target as HTMLInputElement;
    let valor = elemento.value.toLowerCase();
    this.discosInterfazFiltrados = this.discosInterfaz.filter(disco => disco.nombre.toLowerCase().includes(valor) ||
      disco.fecha.toLowerCase().includes(valor) || disco.precio.toString().toLowerCase().includes(valor) || disco.descripcion.toLowerCase().includes(valor));

  }

  agregar() {

    this.router.navigate(["/agregarDiscos", this.idArtista]);

  }

  editar(discoInterfaz: DiscoInterfaz) {

    sessionStorage.setItem("idArtista", this.idArtista.toString());
    this.router.navigate(["/editarDisco", discoInterfaz.id]);

  }

  eliminar(discoInterfaz: DiscoInterfaz) {

    this.creadorDiscoService.obtenerPorCreadorYDisco(this.idArtista, discoInterfaz.id).subscribe(creacion => {

      this.creadorDiscoService.eliminar(creacion.id).subscribe(data => {

        this.discoService.eliminar(discoInterfaz.id).subscribe(
          data => {
            this.actualizar();
            this.snackBar.open("Disco eliminado con éxito", "cerrar", { duration: 3000 });
          }
        );

      });

    })

  }

  agregarAlCarrito(discoInterfaz: DiscoInterfaz) {

    let usuarioJson = sessionStorage.getItem("usuario");

    if (usuarioJson != null) {

      let usuario: UsuarioDto = JSON.parse(usuarioJson);

      if (this.carrito != null) {

        this.compraService.obtenerCompraCarrito(usuario.id).subscribe(compra => {

          this.discoService.obtenerPorId(discoInterfaz.id).subscribe(disco => {

            let compraDisco: CompraDiscoDto = new CompraDiscoDto();
            compraDisco.compra = compra;
            compraDisco.disco = disco;
            this.compraDiscoService.crear(compraDisco).subscribe(data => {


              this.snackBar.open("El disco se ha agregado al carrito", "cerrar", { duration: 3000 });
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
          this.agregarAlCarrito(discoInterfaz);
        });

      }

    }

  }

  comprobarExistencia(discoInterfaz: DiscoInterfaz) {

    if (this.carrito != null) {

      let indice: number = this.discosInterfaz.indexOf(discoInterfaz);
      return this.existenciaCarrito[indice];

    } else {

      return false;

    }

  }

}

class ArtistaInterfaz {

  nombre: string;
  genero: string;
  fecha: string;
  pais: string;
  foto: string;

}

class DiscoInterfaz {

  id: number;
  nombre: string;
  precio: number;
  fecha: string;
  descripcion: string;
  portada: string;

}
