import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/_service/usuario.service';
import { ValidacionComponent } from '../../Utilitarios/validacion/validacion.component';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit {

  constructor(private snackBar: MatSnackBar,
    private usuariosService: UsuarioService,
    private router: Router) { }

  inicioSesionForm: FormGroup;

  ngOnInit(): void {

    this.inicioSesionForm = this.createFormGroup();

  }

  createFormGroup() {

    return new FormGroup({

      correo: new FormControl('', [
        Validators.required,
        Validators.email
      ] ),
      clave: new FormControl('', [
        Validators.required
      ] )

    });

  }

  getMensajeError(){

    let mensajeError:string[] = [];

    if(this.inicioSesionForm.controls.correo.hasError('email') || this.inicioSesionForm.controls.correo.hasError('required')){

      mensajeError.push("Digite un correo electrónico válido");

    }

    if(this.inicioSesionForm.controls.clave.hasError('required')){

      mensajeError.push("Digite la contraseña");

    }

    return mensajeError;

  }

  iniciarSesion(){

    if (this.inicioSesionForm.valid) {
    
      this.usuariosService.iniciarSesion(this.inicioSesionForm.controls.correo.value, this.inicioSesionForm.controls.clave.value).subscribe(data => {

        sessionStorage.setItem("usuario", JSON.stringify(data));
        this.router.navigate(["/gestionarArtistas"]);
        
      }, error => {

        this.snackBar.open("Credenciales de acceso incorrectas", "close", {duration:3000});

      })

    }else{

      let mensajeError = this.getMensajeError();
      
      this.snackBar.openFromComponent(ValidacionComponent, {
        data: mensajeError,
        duration: 3000
      });

    }

  }

}
