import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtistaService } from 'src/app/_service/artista.service';
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

  constructor(private route: ActivatedRoute,
    private artistaService: ArtistaService,
    private discoService: DiscoService,
    private creadorDiscoService: CreadorDiscoService,
    private router: Router,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {

      this.idArtista = params['id'];

      this.actualizar();

    });

  }

  actualizar() {

    this.discosInterfaz = [];
    this.discosInterfazFiltrados = [];

    this.artistaService.obtenerPorId(this.idArtista).subscribe(artista => {

      this.artistaInterfaz = new ArtistaInterfaz();
      this.artistaInterfaz.nombre = artista.nombres + " " + artista.apellidos;
      this.artistaInterfaz.genero = artista.genero.nombre;
      this.artistaInterfaz.pais = artista.pais.nombre;
      let fechaConvertida:Date = new Date(artista.fechaDeNacimiento);
      fechaConvertida.setDate(fechaConvertida.getDate()+1);
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
          let fechaConvertida:Date = new Date(disco.fechaDeLanzamiento);
          fechaConvertida.setDate(fechaConvertida.getDate()+1);
          discoInterfaz.fecha = new Date(fechaConvertida).toLocaleString().split(",")[0];
          discoInterfaz.nombre = disco.nombre;
          if(disco.portada != undefined){
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

  editar(discoInterfaz: DiscoInterfaz){

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
