import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CreadorDiscoDto } from 'src/app/_model/CreadorDiscoDto';
import { DiscoDto } from 'src/app/_model/DiscoDto';
import { ArtistaService } from 'src/app/_service/artista.service';
import { CreadorDiscoService } from 'src/app/_service/creador-disco.service';
import { DiscoService } from 'src/app/_service/disco.service';
import { ValidacionComponent } from '../../Utilitarios/validacion/validacion.component';

@Component({
  selector: 'app-agregar-discos',
  templateUrl: './agregar-discos.component.html',
  styleUrls: ['./agregar-discos.component.css']
})
export class AgregarDiscosComponent implements OnInit {

  archivo?: Uint8Array;
  agregarDiscoForm: FormGroup;
  idArtista: number;
  idDisco: number;
  isEditando: boolean = false;

  constructor(private route: ActivatedRoute,
    private discoService: DiscoService,
    private snackBar: MatSnackBar,
    private creadorDiscoService: CreadorDiscoService,
    private artistaService: ArtistaService,
    private router: Router) { }

  ngOnInit(): void {

    if (this.router.url.includes("editarDisco")) {

      this.isEditando = true;
      this.route.params.subscribe(params => {

        this.idDisco = params['id'];
        this.agregarDiscoForm = this.createFormGroup();

        this.discoService.obtenerPorId(this.idDisco).subscribe(disco => {

          this.agregarDiscoForm.controls.nombre.setValue(disco.nombre);
          this.agregarDiscoForm.controls.fechaLanzamiento.setValue(disco.fechaDeLanzamiento);
          this.agregarDiscoForm.controls.precio.setValue(disco.precio);
          this.agregarDiscoForm.controls.descripcion.setValue(disco.descripcion);

          let elemento = document.getElementById("imagenCargada") as HTMLImageElement;

          if (disco.portada != undefined) {
            elemento.src = disco.portada;
          } else {
            elemento.src = "assets/imagenes/DiscoNulo.png";
          }

        })

      });

    } else {
      this.route.params.subscribe(params => {

        this.idArtista = params['id'];
        this.agregarDiscoForm = this.createFormGroup();

      });
    }

  }

  createFormGroup() {

    return new FormGroup({

      nombre: new FormControl('', [
        Validators.required,
      ]),
      fechaLanzamiento: new FormControl('', [
        Validators.required
      ]),
      precio: new FormControl('', [
        Validators.required
      ]),
      descripcion: new FormControl('', [
        Validators.required
      ]),
      portada: new FormControl('', [

      ]),

    });

  }

  onFileSelected(event: any) {

    let archivoInput: File = event.target.files[0];

    let reader = new FileReader();

    archivoInput.arrayBuffer().then(buffer => {
      this.archivo = new Uint8Array(buffer);
    });

    reader.onload = function (e) {

      let elemento = document.getElementById("imagenCargada") as HTMLImageElement;
      let resultado = e.target?.result;
      if (typeof (resultado) == 'string') {

        elemento.src = resultado;

      }

    }

    reader.readAsDataURL(archivoInput);

  }

  getMensajeError() {

    let mensajeError: string[] = [];

    if (this.agregarDiscoForm.controls.nombre.hasError('required')) {

      mensajeError.push("El disco debe tener un nombre");

    }

    if (this.agregarDiscoForm.controls.fechaLanzamiento.hasError('required')) {

      mensajeError.push("El disco debe tener una fecha de lanzamiento");

    }

    if (this.agregarDiscoForm.controls.precio.hasError('required')) {

      mensajeError.push("El disco debe tener un precio");

    }

    if (this.agregarDiscoForm.controls.descripcion.hasError('required')) {

      mensajeError.push("El disco debe tener una descripción");

    }

    return mensajeError;

  }

  agregar() {

    if (this.agregarDiscoForm.valid) {

      let disco: DiscoDto = new DiscoDto();
      disco.nombre = this.agregarDiscoForm.controls.nombre.value;
      disco.fechaDeLanzamiento = this.agregarDiscoForm.controls.fechaLanzamiento.value;
      disco.precio = this.agregarDiscoForm.controls.precio.value;
      disco.descripcion = this.agregarDiscoForm.controls.descripcion.value;

      if (this.archivo != undefined) {

        disco.portadaEnBytes = [];

        this.archivo.forEach(byte => {
          disco.portadaEnBytes.push(byte);
        });

      }

      this.discoService.crear(disco).subscribe(discoCreado => {

        this.artistaService.obtenerPorId(this.idArtista).subscribe(artista => {

          let creacionDisco: CreadorDiscoDto = new CreadorDiscoDto();

          creacionDisco.artista = artista;
          creacionDisco.disco = discoCreado;

          this.creadorDiscoService.crear(creacionDisco).subscribe(data => {

            this.agregarDiscoForm.reset();

            this.archivo = undefined;

            let elemento = document.getElementById("imagenCargada") as HTMLImageElement;
            elemento.src = "assets/imagenes/DiscoNulo.png";

            this.snackBar.open("Disco creado con éxito", "cerrar", { duration: 3000 });

          })

        })

      })

    } else {

      let mensajeError = this.getMensajeError();

      this.snackBar.openFromComponent(ValidacionComponent, {
        data: mensajeError,
        duration: 3000
      });

    }

  }

  editar() {

    if (this.agregarDiscoForm.valid) {

      this.discoService.obtenerPorId(this.idDisco).subscribe(disco => {

        disco.nombre = this.agregarDiscoForm.controls.nombre.value;
        disco.fechaDeLanzamiento = this.agregarDiscoForm.controls.fechaLanzamiento.value;
        disco.precio = this.agregarDiscoForm.controls.precio.value;
        disco.descripcion = this.agregarDiscoForm.controls.descripcion.value;
        disco.portada = undefined;

        if (this.archivo != undefined) {

          disco.portadaEnBytes = [];

          this.archivo.forEach(byte => {
            disco.portadaEnBytes.push(byte);
          });

        }

        this.discoService.editar(disco).subscribe(data => {

          this.snackBar.open("Disco editado con éxito", "cerrar", { duration: 3000 });
          let idArtistaSession = sessionStorage.getItem("idArtista");
          if(idArtistaSession != null){
            let idArtista: number = parseInt(idArtistaSession);
            sessionStorage.removeItem("idArtista");
            this.router.navigate(["/gestionarDiscos", idArtista]);
          }

        })


      })

    } else {

      let mensajeError = this.getMensajeError();

      this.snackBar.openFromComponent(ValidacionComponent, {
        data: mensajeError,
        duration: 3000
      });

    }

  }

}
