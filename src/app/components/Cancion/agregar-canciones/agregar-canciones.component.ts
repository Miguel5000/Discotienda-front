import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CancionDto } from 'src/app/_model/CancionDto';
import { FormatoDto } from 'src/app/_model/FormatoDto';
import { CancionService } from 'src/app/_service/cancion.service';
import { DiscoService } from 'src/app/_service/disco.service';
import { FormatoService } from 'src/app/_service/formato.service';
import { ValidacionComponent } from '../../Utilitarios/validacion/validacion.component';

@Component({
  selector: 'app-agregar-canciones',
  templateUrl: './agregar-canciones.component.html',
  styleUrls: ['./agregar-canciones.component.css']
})
export class AgregarCancionesComponent implements OnInit {

  archivo?: Uint8Array;
  agregarCancionForm: FormGroup;
  idDisco: number;
  idCancion: number;
  formatos: FormatoDto[] = [];
  isEditando: boolean = false;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private formatoService: FormatoService,
    private cancionService: CancionService,
    private discoService: DiscoService) { }

  ngOnInit(): void {

    this.formatoService.obtenerTodos().subscribe(formatos => {

      this.formatos = formatos;

    })

    if (this.router.url.includes("editarCancion")) {

      this.isEditando = true;

      this.route.params.subscribe(params => {

        this.idCancion = params['id'];
        this.agregarCancionForm = this.createFormGroup();

        this.cancionService.obtenerPorId(this.idCancion).subscribe(cancion => {

          this.agregarCancionForm.controls.nombre.setValue(cancion.nombre);
          this.agregarCancionForm.controls.minutos.setValue(cancion.duracion.split(":")[0]);
          this.agregarCancionForm.controls.segundos.setValue(cancion.duracion.split(":")[1]);
          this.agregarCancionForm.controls.formato.setValue(cancion.formato.id);
          this.agregarCancionForm.controls.precio.setValue(cancion.precio);
          this.agregarCancionForm.controls.descripcion.setValue(cancion.descripcion);

          let elemento = document.getElementById("imagenCargada") as HTMLImageElement;

          if (cancion.portada != undefined) {
            elemento.src = cancion.portada;
          } else {
            elemento.src = "assets/imagenes/CanciónNula.png";
          }

        })

      });

    } else {

      this.route.params.subscribe(params => {

        this.idDisco = params['id'];
        this.agregarCancionForm = this.createFormGroup();

      });

    }

  }

  createFormGroup() {

    return new FormGroup({

      nombre: new FormControl('', [
        Validators.required,
      ]),
      minutos: new FormControl('00', [
      ]),
      segundos: new FormControl('00', [
      ]),
      formato: new FormControl(null, [
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

    if (this.agregarCancionForm.controls.nombre.hasError('required')) {

      mensajeError.push("La canción debe tener un nombre");

    }

    if (this.agregarCancionForm.controls.minutos.value == "00" && this.agregarCancionForm.controls.segundos.value == "00") {

      mensajeError.push("La canción debe tener una duración");

    }

    if (this.agregarCancionForm.controls.formato.hasError('required')) {

      mensajeError.push("La canción debe tener un formato");

    }

    if (this.agregarCancionForm.controls.precio.hasError('required')) {

      mensajeError.push("La canción debe tener un precio");

    }

    if (this.agregarCancionForm.controls.descripcion.hasError('required')) {

      mensajeError.push("La canción debe tener una descripción");

    }

    return mensajeError;

  }

  agregar() {

    let mensajeError = this.getMensajeError();

    if (this.agregarCancionForm.valid && mensajeError.length == 0) {

      this.discoService.obtenerPorId(this.idDisco).subscribe(disco => {

        this.formatoService.obtenerPorId(this.agregarCancionForm.controls.formato.value).subscribe(formato => {

          let cancion: CancionDto = new CancionDto();
          cancion.nombre = this.agregarCancionForm.controls.nombre.value;
          cancion.duracion = this.agregarCancionForm.controls.minutos.value + ":" + this.agregarCancionForm.controls.segundos.value + ":00";
          cancion.formato = formato;
          cancion.precio = this.agregarCancionForm.controls.precio.value;
          cancion.descripcion = this.agregarCancionForm.controls.descripcion.value;
          cancion.disco = disco;

          if (this.archivo != undefined) {

            cancion.portadaEnBytes = [];

            this.archivo.forEach(byte => {
              cancion.portadaEnBytes.push(byte);
            });

          }

          this.cancionService.crear(cancion).subscribe(data => {

            this.agregarCancionForm.reset();

            this.archivo = undefined;

            let elemento = document.getElementById("imagenCargada") as HTMLImageElement;
            elemento.src = "assets/imagenes/CanciónNula.png";

            this.snackBar.open("Canción creada con éxito", "cerrar", { duration: 3000 });

          })

        })

      });

    } else {

      this.snackBar.openFromComponent(ValidacionComponent, {
        data: mensajeError,
        duration: 3000
      });

    }

  }

  editar() {

    let idDiscoSession = sessionStorage.getItem("idDisco");
    let idDisco: number = 0;
    if (idDiscoSession != null) {
      idDisco = parseInt(idDiscoSession);
      sessionStorage.removeItem("idDisco");
    }

    let mensajeError = this.getMensajeError();

    if (this.agregarCancionForm.valid && mensajeError.length == 0) {

      this.discoService.obtenerPorId(idDisco).subscribe(disco => {

        this.formatoService.obtenerPorId(this.agregarCancionForm.controls.formato.value).subscribe(formato => {

          this.cancionService.obtenerPorId(this.idCancion).subscribe(cancion => {

            cancion.nombre = this.agregarCancionForm.controls.nombre.value;
            cancion.duracion = this.agregarCancionForm.controls.minutos.value + ":" + this.agregarCancionForm.controls.segundos.value + ":00";
            cancion.formato = formato;
            cancion.precio = this.agregarCancionForm.controls.precio.value;
            cancion.descripcion = this.agregarCancionForm.controls.descripcion.value;
            cancion.disco = disco;

            if (this.archivo != undefined) {

              cancion.portadaEnBytes = [];

              this.archivo.forEach(byte => {
                cancion.portadaEnBytes.push(byte);
              });

            }

            this.cancionService.editar(cancion).subscribe(data => {

              this.snackBar.open("Canción editada con éxito", "cerrar", { duration: 3000 });
 
              this.router.navigate(["/gestionarCanciones", idDisco]);

            })

          });
        });
      });

    } else {

      let mensajeError = this.getMensajeError();

      this.snackBar.openFromComponent(ValidacionComponent, {
        data: mensajeError,
        duration: 3000
      });

    }

  }

}
