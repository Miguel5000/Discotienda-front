import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
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
  idDisco: number;

  constructor(private route: ActivatedRoute,
    private discoService: DiscoService,
    private cancionService: CancionService,
    private router: Router,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {

      this.idDisco = params['id'];

      this.actualizar();

    });

  }

  filtrar(event: Event){

    let elemento:HTMLInputElement = event.target as HTMLInputElement;
    let valor = elemento.value.toLowerCase();
    this.cancionesInterfazFiltradas = this.cancionesInterfaz.filter(cancion => cancion.nombre.toLowerCase().includes(valor) ||
    cancion.precio.toString().toLowerCase().includes(valor) || cancion.duracion.toLowerCase().includes(valor) || cancion.formato.toLowerCase().includes(valor) ||
    cancion.descripcion.toLowerCase().includes(valor));

  }

  agregar(){

    this.router.navigate(["/agregarCanciones", this.idDisco]);

  }

  actualizar(){

    this.cancionesInterfaz = [];
    this.cancionesInterfazFiltradas = [];

    this.discoService.obtenerPorId(this.idDisco).subscribe(disco => {

      this.discoInterfaz.descripcion = disco.descripcion;
      let fechaConvertida:Date = new Date(disco.fechaDeLanzamiento);
      fechaConvertida.setDate(fechaConvertida.getDate()+1);
      this.discoInterfaz.fechaDeLanzamiento = new Date(fechaConvertida).toLocaleString().split(",")[0];
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


  }

  editar(cancionInterfaz: CancionInterfaz){

    sessionStorage.setItem("idDisco", this.idDisco.toString());
    this.router.navigate(["/editarCancion", cancionInterfaz.id]);

  }

  eliminar(cancionInterfaz: CancionInterfaz){

    this.cancionService.eliminar(cancionInterfaz.id).subscribe(data => {

      this.actualizar();
      this.snackBar.open("Canción eliminada con éxito", "cerrar", { duration: 3000 });

    });

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

  id: number;
  nombre: string;
  precio: number;
  duracion: string;
  formato: string;
  descripcion: string;
  portada: string;

}
