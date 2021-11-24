import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VentasArtista } from 'src/app/_model/VentasArtista';
import { VentasCancion } from 'src/app/_model/VentasCancion';
import { VentasDisco } from 'src/app/_model/VentasDisco';
import { ArtistaService } from 'src/app/_service/artista.service';
import { CompraCancionService } from 'src/app/_service/compra-cancion.service';
import { CompraDiscoService } from 'src/app/_service/compra-disco.service';
import { DiscoService } from 'src/app/_service/disco.service';
import { MatTab } from '@angular/material/tabs';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  ventasArtistas: VentasArtista[] = [];
  ventasDiscos: VentasDisco[] = [];
  ventasCanciones: VentasCancion[] = [];

  ventasArtistasFiltradas: VentasArtista[] = [];
  ventasDiscosFiltradas: VentasDisco[] = [];
  ventasCancionesFiltradas: VentasCancion[] = [];

  constructor(private router: Router,
    private artistaService: ArtistaService,
    private compraDiscoService: CompraDiscoService,
    private compraCancionService: CompraCancionService) { }

  ngOnInit(): void {

    this.cargarArtistas();
    this.cargarDiscos();
    this.cargarCanciones();

  }

  cargarArtistas(){

    this.artistaService.obtenerVentas().subscribe(ventas => {

      this.ventasArtistas = ventas;
      this.ventasArtistasFiltradas = ventas;

      this.ventasArtistas.forEach(venta => {
        venta.foto = (venta.foto != null) ? venta.foto : "assets/imagenes/ArtistaNulo.png";
      });

      this.ventasArtistasFiltradas.forEach(venta => {
        venta.foto = (venta.foto != null) ? venta.foto : "assets/imagenes/ArtistaNulo.png";
      });
      
    })  

  }

  cargarDiscos(){

    this.compraDiscoService.obtenerVentas().subscribe(ventas => {

      this.ventasDiscos = ventas;
      this.ventasDiscosFiltradas = ventas;

      this.ventasDiscos.forEach(venta => {
        venta.portada = (venta.portada != null) ? venta.portada : "assets/imagenes/DiscoNulo.png";
      });

      this.ventasDiscosFiltradas.forEach(venta => {
        venta.portada = (venta.portada != null) ? venta.portada : "assets/imagenes/DiscoNulo.png";
      });
      
    })   

  }

  cargarCanciones(){

    this.compraCancionService.obtenerVentas().subscribe(ventas => {

      this.ventasCanciones = ventas;
      this.ventasCancionesFiltradas = ventas;

      this.ventasCanciones.forEach(venta => {
        venta.portada = (venta.portada != null) ? venta.portada : "assets/imagenes/CanciónNula.png";
      });

      this.ventasCancionesFiltradas.forEach(venta => {
        venta.portada = (venta.portada != null) ? venta.portada : "assets/imagenes/CanciónNula.png";
      });
      
    })    

  }


  filtrar(event: Event){

    let elemento:HTMLInputElement = event.target as HTMLInputElement;
    let valor = elemento.value.toLowerCase();

    this.ventasArtistasFiltradas = this.ventasArtistas.filter(venta => venta.nombres.toLowerCase().includes(valor));
    this.ventasDiscosFiltradas = this.ventasDiscos.filter(venta => venta.nombre.toLowerCase().includes(valor));
    this.ventasCancionesFiltradas = this.ventasCanciones.filter(venta => venta.nombre.toLowerCase().includes(valor));
    
  }

}
