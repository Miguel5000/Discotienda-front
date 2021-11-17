import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArtistaService } from 'src/app/_service/artista.service';
import { GeneroService } from 'src/app/_service/genero.service';
import { PaisService } from 'src/app/_service/pais.service';

@Component({
  selector: 'app-gestionar-artistas',
  templateUrl: './gestionar-artistas.component.html',
  styleUrls: ['./gestionar-artistas.component.css']
})
export class GestionarArtistasComponent implements OnInit {

  artistasInterfaz: ArtistaInterfaz[] = [];
  artistasInterfazFiltrados: ArtistaInterfaz[] = [];

  constructor(private artistaService: ArtistaService,
    private generoService: GeneroService,
    private paisService: PaisService,
    private router: Router) { }

  ngOnInit(): void {

    this.artistaService.obtenerTodos().subscribe(artistas => {

      artistas.forEach(artista => {

        let artistaInterfaz = new ArtistaInterfaz();
        artistaInterfaz.id = artista.id;
        artistaInterfaz.nombre = artista.nombres + " " + artista.apellidos;
        artistaInterfaz.genero = artista.genero.nombre;
        artistaInterfaz.fecha = artista.fechaDeNacimiento;
        artistaInterfaz.pais = artista.pais.nombre;
        artistaInterfaz.foto = artista.foto;

        if (artistaInterfaz.foto == null || artistaInterfaz.foto == "") {

          artistaInterfaz.foto = "assets/imagenes/ArtistaNulo.png";

        }

        this.artistasInterfaz.push(artistaInterfaz);
        this.artistasInterfazFiltrados.push(artistaInterfaz);

      });

    });

  }

  gestionarDiscos(idArtista: number) {

    this.router.navigate(["/gestionarDiscos/", idArtista]);

  }

  filtrar(event: Event){

    let elemento:HTMLInputElement = event.target as HTMLInputElement;
    let valor = elemento.value.toLowerCase();
    this.artistasInterfazFiltrados = this.artistasInterfaz.filter(artista => artista.nombre.toLowerCase().includes(valor) ||
    artista.fecha.toLowerCase().includes(valor) || artista.genero.toLowerCase().includes(valor) || artista.pais.toLowerCase().includes(valor));

  }

}

class ArtistaInterfaz {

  id: number;
  nombre: string;
  genero: string;
  fecha: string;
  pais: string;
  foto: string;

}
