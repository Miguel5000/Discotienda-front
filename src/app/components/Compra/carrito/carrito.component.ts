import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTab } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { CancionDto } from 'src/app/_model/CancionDto';
import { DiscoDto } from 'src/app/_model/DiscoDto';
import { UsuarioDto } from 'src/app/_model/UsuarioDto';
import { CompraCancionService } from 'src/app/_service/compra-cancion.service';
import { CompraDiscoService } from 'src/app/_service/compra-disco.service';
import { CompraService } from 'src/app/_service/compra.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  discos: DiscoDto[] = [];
  canciones: CancionDto[] = [];
  total: number = 0;
  usuario: UsuarioDto = new UsuarioDto();
  isCarrito: boolean = true;
  idCompra: number;

  constructor(private compraService: CompraService,
    private compraDiscoService: CompraDiscoService,
    private compraCancionService: CompraCancionService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    if (this.router.url.includes("compra")) {

      this.route.params.subscribe(params => {

        this.idCompra = params['id'];

        this.isCarrito = false;
        this.actualizarCompra();

      });

    } else {

      this.actualizar();

    }

  }

  actualizarCompra() {

    this.discos = [];
    this.canciones = [];
    this.total = 0;

    this.compraService.obtenerCarritoPorCompra(this.idCompra).subscribe(carrito => {

      this.discos = carrito.discos;
      this.canciones = carrito.canciones;

      this.discos.forEach(disco => {
        this.total = this.total + disco.precio;
        disco.portada = (disco.portada != null) ? disco.portada : "assets/imagenes/DiscoNulo.png";
      });

      this.canciones.forEach(cancion => {
        this.total = this.total + cancion.precio;
        cancion.portada = (cancion.portada != null) ? cancion.portada : "assets/imagenes/CanciónNula.png";
      });

    })

  }

  actualizar() {

    this.discos = [];
    this.canciones = [];
    this.total = 0;

    let usuarioJson = sessionStorage.getItem("usuario");

    if (usuarioJson != null) {

      this.usuario = JSON.parse(usuarioJson);

      this.compraService.obtenerCarrito(this.usuario.id).subscribe(carrito => {

        this.discos = carrito.discos;
        this.canciones = carrito.canciones;

        this.discos.forEach(disco => {
          this.total = this.total + disco.precio;
          disco.portada = (disco.portada != null) ? disco.portada : "assets/imagenes/DiscoNulo.png";
        });

        this.canciones.forEach(cancion => {
          this.total = this.total + cancion.precio;
          cancion.portada = (cancion.portada != null) ? cancion.portada : "assets/imagenes/CanciónNula.png";
        });

      })

    }

  }

  retirarCancion(cancion: CancionDto) {

    this.compraService.obtenerCompraCarrito(this.usuario.id).subscribe(compra => {

      this.compraCancionService.retirarCancion(cancion.id, compra.id).subscribe(data => {

        this.actualizar();
        this.snackBar.open("Se ha retirado la canción del carrito", "cerrar", { duration: 3000 });

      });

    });

  }

  retirarDisco(disco: DiscoDto) {

    this.compraService.obtenerCompraCarrito(this.usuario.id).subscribe(compra => {

      this.compraDiscoService.retirarDisco(disco.id, compra.id).subscribe(data => {

        this.actualizar();
        this.snackBar.open("Se ha retirado el disco del carrito", "cerrar", { duration: 3000 });

      });

    });

  }

  retirarTodo() {

    this.discos.forEach(disco => {

      this.compraService.obtenerCompraCarrito(this.usuario.id).subscribe(compra => {

        this.compraDiscoService.retirarDisco(disco.id, compra.id).subscribe();

      });

    });

    this.canciones.forEach(cancion => {

      this.compraService.obtenerCompraCarrito(this.usuario.id).subscribe(compra => {

        this.compraCancionService.retirarCancion(cancion.id, compra.id).subscribe();

      });

    });

    this.snackBar.open("Se ha limpiado el carrito", "cerrar", { duration: 3000 });
    this.router.navigate(["/gestionarArtistas"]);

  }

  comprar() {

    this.compraService.obtenerCompraCarrito(this.usuario.id).subscribe(compra => {

      let fechaActual = new Date();
      compra.fechaCompra = fechaActual.getFullYear() + "-" + (fechaActual.getMonth() + 1) + "-" + fechaActual.getDate() + "T" + ((fechaActual.getHours().toString().length < 2) ? ("0" + fechaActual.getHours()):fechaActual.getHours())  + ":" + ((fechaActual.getMinutes().toString().length < 2) ? ("0" + fechaActual.getMinutes()):fechaActual.getMinutes()) + ":00.000";
      compra.valorCompra = this.total;

      this.compraService.editar(compra).subscribe(data => {

        this.compraService.obtenerPorId(compra.id).subscribe(compraEditada => {

          this.compraService.comprar(compra.id).subscribe(data => {

            this.snackBar.open("Compra realizada con éxito", "cerrar", { duration: 3000 });
            this.router.navigate(["/gestionarArtistas"]);

          }
          );

        })

      })

    });

  }

}
