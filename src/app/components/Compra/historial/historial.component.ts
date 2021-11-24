import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VentasArtista } from 'src/app/_model/VentasArtista';
import { VentasCancion } from 'src/app/_model/VentasCancion';
import { VentasDisco } from 'src/app/_model/VentasDisco';
import { ArtistaService } from 'src/app/_service/artista.service';
import { CompraCancionService } from 'src/app/_service/compra-cancion.service';
import { CompraDiscoService } from 'src/app/_service/compra-disco.service';
import { DiscoService } from 'src/app/_service/disco.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  ventasArtistas: VentasArtista[] = [];
  ventasDiscos: VentasDisco[] = [];
  ventasCanciones: VentasCancion[] = [];

  constructor(private router: Router,
    private artistaService: ArtistaService,
    private compraDiscoService: CompraDiscoService,
    private compraCancionService: CompraCancionService) { }

  ngOnInit(): void {

    if(this.router.url.includes("Artista")){

      this.artistaService.obtenerVentas().subscribe(ventas => {

        this.ventasArtistas = ventas;

        this.ventasArtistas.forEach(venta => {
          venta.foto = (venta.foto != null) ? venta.foto : "assets/imagenes/ArtistaNulo.png";
        });
        
      })      

    }else if(this.router.url.includes("Disco")){

      this.compraDiscoService.obtenerVentas().subscribe(ventas => {

        this.ventasDiscos = ventas;

        this.ventasDiscos.forEach(venta => {
          venta.portada = (venta.portada != null) ? venta.portada : "assets/imagenes/DiscoNulo.png";
        });
        
      })     

    }else{

      this.compraCancionService.obtenerVentas().subscribe(ventas => {

        this.ventasCanciones = ventas;

        this.ventasCanciones.forEach(venta => {
          venta.portada = (venta.portada != null) ? venta.portada : "assets/imagenes/CanciónNula.png";
        });
        
      })     

    }

  }

}
