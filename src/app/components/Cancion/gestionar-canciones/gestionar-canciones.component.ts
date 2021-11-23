import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CancionService } from 'src/app/_service/cancion.service';
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

  constructor(private route: ActivatedRoute,
    private discoService: DiscoService,
    private cancionService: CancionService) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {

      let id: number = params['id'];

      this.discoService.obtenerPorId(id).subscribe(disco => {

        this.discoInterfaz.descripcion = disco.descripcion;
        this.discoInterfaz.fechaDeLanzamiento = new Date(disco.fechaDeLanzamiento).toLocaleString().split(",")[0];
        this.discoInterfaz.nombre = disco.nombre;
        this.discoInterfaz.precio = disco.precio;
        if(disco.portada != undefined){
          this.discoInterfaz.portada = disco.portada;
        }

        if (this.discoInterfaz.portada == null || this.discoInterfaz.portada == "") {

          this.discoInterfaz.portada = "assets/imagenes/DiscoNulo.png";

        }

        this.cancionService.obtenerListaPorDisco(disco.id).subscribe(canciones => {

          canciones.forEach(cancion => {

            let cancionInterfaz: CancionInterfaz = new CancionInterfaz();
            cancionInterfaz.descripcion = cancion.descripcion;
            cancionInterfaz.duracion = cancion.duracion.split(":")[1] + ":" + cancion.duracion.split(":")[2];
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

  filtrar(event: Event){

    let elemento:HTMLInputElement = event.target as HTMLInputElement;
    let valor = elemento.value.toLowerCase();
    this.cancionesInterfazFiltradas = this.cancionesInterfaz.filter(cancion => cancion.nombre.toLowerCase().includes(valor) ||
    cancion.precio.toString().toLowerCase().includes(valor) || cancion.duracion.toLowerCase().includes(valor) || cancion.formato.toLowerCase().includes(valor) ||
    cancion.descripcion.toLowerCase().includes(valor));

  }

}

class DiscoInterfaz{

  nombre: string;
  fechaDeLanzamiento: string;
  precio: number;
  descripcion: string;
  portada: string;

}

class CancionInterfaz{

  nombre: string;
  precio: number;
  duracion: string;
  formato: string;
  descripcion: string;
  portada: string;

}
