import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtistaService } from 'src/app/_service/artista.service';
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

  constructor(private route: ActivatedRoute,
    private artistaService: ArtistaService,
    private discoService: DiscoService,
    private router: Router) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      
      let id: number = params['id'];

      this.artistaService.obtenerPorId(id).subscribe(artista => {

        this.artistaInterfaz = new ArtistaInterfaz();
        this.artistaInterfaz.nombre = artista.nombres + " " + artista.apellidos;
        this.artistaInterfaz.genero = artista.genero.nombre;
        this.artistaInterfaz.pais = artista.pais.nombre;
        this.artistaInterfaz.fecha = new Date(artista.fechaDeNacimiento).toLocaleString().split(",")[0];
        this.artistaInterfaz.foto = artista.foto;

        if (this.artistaInterfaz.foto == null || this.artistaInterfaz.foto == "") {

          this.artistaInterfaz.foto = "assets/imagenes/ArtistaNulo.png";

        }

        this.discoService.obtenerPorArtista(id).subscribe(discos => {

          discos.forEach(disco => {
            
            let discoInterfaz: DiscoInterfaz = new DiscoInterfaz();
            discoInterfaz.id = disco.id;
            discoInterfaz.descripcion = disco.descripcion;
            discoInterfaz.fecha = new Date(disco.fechaDeLanzamiento).toLocaleString().split(",")[0];
            discoInterfaz.nombre = disco.nombre;
            discoInterfaz.portada = disco.portada
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

  gestionarCanciones(idDisco: number) {

    this.router.navigate(["/gestionarCanciones/", idDisco]);

  }

  filtrar(event: Event){

    let elemento:HTMLInputElement = event.target as HTMLInputElement;
    let valor = elemento.value.toLowerCase();
    this.discosInterfazFiltrados = this.discosInterfaz.filter(disco => disco.nombre.toLowerCase().includes(valor) ||
    disco.fecha.toLowerCase().includes(valor) || disco.precio.toString().toLowerCase().includes(valor) || disco.descripcion.toLowerCase().includes(valor));

  }

}

class ArtistaInterfaz{

  nombre: string;
  genero: string;
  fecha: string;
  pais: string;
  foto: string;

}

class DiscoInterfaz{

  id: number;
  nombre: string;
  precio: number;
  fecha: string;
  descripcion: string;
  portada: string;

}
