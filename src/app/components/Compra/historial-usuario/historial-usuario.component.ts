import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompraDto } from 'src/app/_model/CompraDto';
import { UsuarioDto } from 'src/app/_model/UsuarioDto';
import { CompraService } from 'src/app/_service/compra.service';

@Component({
  selector: 'app-historial-usuario',
  templateUrl: './historial-usuario.component.html',
  styleUrls: ['./historial-usuario.component.css']
})
export class HistorialUsuarioComponent implements OnInit {

  compras: CompraDto[] = [];
  comprasFiltradas: CompraDto[] = [];

  constructor(private compraService: CompraService,
    private router: Router) { }

  ngOnInit(): void {

    let usuarioJson = sessionStorage.getItem("usuario");

    if (usuarioJson != null) {

      let usuario: UsuarioDto = JSON.parse(usuarioJson);
      this.compraService.obtenerComprasDeUsuario(usuario.id).subscribe(compras => {

        this.compras = compras.filter(compra => compra.realizacion != false);
        this.comprasFiltradas = compras.filter(compra => compra.realizacion != false);

        this.compras.forEach(compra => {
          compra.fechaCompra = new Date(compra.fechaCompra).toLocaleString();
        });

      })

    }

  }

  ver(compra: CompraDto){

    this.router.navigate(["/compra", compra.id]);

  }

  filtrar(event: Event){

    let elemento:HTMLInputElement = event.target as HTMLInputElement;
    let valor = elemento.value.toLowerCase();

    this.comprasFiltradas = this.compras.filter(compra => compra.fechaCompra.toLowerCase().includes(valor) ||
    compra.valorCompra.toString().toLowerCase().includes(valor));

  }

}
