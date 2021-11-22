import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtistaDto } from 'src/app/_model/ArtistaDto';
import { GeneroDto } from 'src/app/_model/GeneroDto';
import { PaisDto } from 'src/app/_model/PaisDto';
import { ArtistaService } from 'src/app/_service/artista.service';
import { GeneroService } from 'src/app/_service/genero.service';
import { PaisService } from 'src/app/_service/pais.service';
import { ValidacionComponent } from '../../Utilitarios/validacion/validacion.component';

@Component({
  selector: 'app-agregar-artistas',
  templateUrl: './agregar-artistas.component.html',
  styleUrls: ['./agregar-artistas.component.css']
})
export class AgregarArtistasComponent implements OnInit {

  archivo?: Uint8Array;
  agregarArtistaForm: FormGroup;
  generos: GeneroDto[] = [];
  paises: PaisDto[] = [];
  isEditando: boolean = false;
  idArtista: number;

  constructor(private generoService: GeneroService,
    private paisService: PaisService,
    private artistaService: ArtistaService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {

    this.agregarArtistaForm = this.createFormGroup();

    this.generoService.obtenerTodos().subscribe(generos => {

      this.generos = generos;

    })

    this.paisService.obtenerTodos().subscribe(paises => {

      this.paises = paises;

    })

    this.route.params.subscribe(params => {

      this.idArtista = params['id'];
      this.isEditando = true;

      this.artistaService.obtenerPorId(this.idArtista).subscribe(artista => {

        this.agregarArtistaForm.controls.nombre.setValue(artista.nombres);
        this.agregarArtistaForm.controls.apellido.setValue(artista.apellidos);
        this.agregarArtistaForm.controls.nombreArtistico.setValue(artista.nombreArtistico);
        this.agregarArtistaForm.controls.fechaNacimiento.setValue(artista.fechaDeNacimiento);
        this.agregarArtistaForm.controls.genero.setValue(artista.genero.id);
        this.agregarArtistaForm.controls.pais.setValue(artista.pais.id);

        let elemento = document.getElementById("imagenCargada") as HTMLImageElement;

        if (artista.foto != undefined) {
          elemento.src = artista.foto;
        } else {
          elemento.src = "assets/imagenes/ArtistaNulo.png";
        }

      })

    });

  }

  createFormGroup() {

    return new FormGroup({

      nombre: new FormControl('', [
        Validators.required,
      ]),
      apellido: new FormControl('', [
        Validators.required
      ]),
      nombreArtistico: new FormControl(null, [

      ]),
      fechaNacimiento: new FormControl('', [
        Validators.required
      ]),
      genero: new FormControl(null, [
        Validators.required
      ]),
      pais: new FormControl(null, [
        Validators.required
      ]),
      foto: new FormControl('', [

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

    if (this.agregarArtistaForm.controls.nombre.hasError('required')) {

      mensajeError.push("El artista debe tener un nombre");

    }

    if (this.agregarArtistaForm.controls.apellido.hasError('required')) {

      mensajeError.push("El artista debe tener un apellido");

    }

    if (this.agregarArtistaForm.controls.fechaNacimiento.hasError('required')) {

      mensajeError.push("El artista debe tener una fecha de nacimiento");

    }

    if (this.agregarArtistaForm.controls.genero.hasError('required')) {

      mensajeError.push("El artista debe tener un género");

    }

    if (this.agregarArtistaForm.controls.pais.hasError('required')) {

      mensajeError.push("El artista debe tener un país de origen");

    }

    return mensajeError;

  }

  agregar() {

    if (this.agregarArtistaForm.valid) {

      this.generoService.obtenerPorId(this.agregarArtistaForm.controls.genero.value).subscribe(genero => {

        this.paisService.obtenerPorId(this.agregarArtistaForm.controls.pais.value).subscribe(pais => {

          let artista: ArtistaDto = new ArtistaDto();
          artista.nombres = this.agregarArtistaForm.controls.nombre.value;
          artista.apellidos = this.agregarArtistaForm.controls.apellido.value;
          artista.nombreArtistico = this.agregarArtistaForm.controls.nombreArtistico.value;
          artista.fechaDeNacimiento = this.agregarArtistaForm.controls.fechaNacimiento.value;
          artista.genero = genero;
          artista.pais = pais;

          if (this.archivo != undefined) {

            artista.fotoEnBytes = [];

            this.archivo.forEach(byte => {
              artista.fotoEnBytes.push(byte);
            });

          }

          this.artistaService.crear(artista).subscribe(data => {

            this.agregarArtistaForm.reset();

            this.archivo = undefined;

            let elemento = document.getElementById("imagenCargada") as HTMLImageElement;
            elemento.src = "assets/imagenes/ArtistaNulo.png";

            this.snackBar.open("Artista creado con éxito", "cerrar", { duration: 3000 });

          });

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

    if (this.agregarArtistaForm.valid) {

      this.generoService.obtenerPorId(this.agregarArtistaForm.controls.genero.value).subscribe(genero => {

        this.paisService.obtenerPorId(this.agregarArtistaForm.controls.pais.value).subscribe(pais => {

          this.artistaService.obtenerPorId(this.idArtista).subscribe(artista => {

            artista.nombres = this.agregarArtistaForm.controls.nombre.value;
            artista.apellidos = this.agregarArtistaForm.controls.apellido.value;
            artista.nombreArtistico = this.agregarArtistaForm.controls.nombreArtistico.value;
            artista.fechaDeNacimiento = this.agregarArtistaForm.controls.fechaNacimiento.value;
            artista.genero = genero;
            artista.pais = pais;
            artista.foto = undefined;

            if (this.archivo != undefined) {

              artista.fotoEnBytes = [];

              this.archivo.forEach(byte => {
                artista.fotoEnBytes.push(byte);
              });

            }

            console.log(artista);

            this.artistaService.editar(artista).subscribe(data => {

              this.snackBar.open("Artista editado con éxito", "cerrar", { duration: 3000 });
              this.router.navigate(["/gestionarArtistas"])

            });

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


}
