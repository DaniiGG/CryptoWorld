import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';

import { PeticionesAjaxService } from '../peticiones-ajax.service';

import { EventEmitter, Output } from '@angular/core';

import { Router } from '@angular/router';

import { Firestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-cuerpo',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './cuerpo.component.html',
  styleUrl: './cuerpo.component.css'
})
export class CuerpoComponent {

  items:any[]=[];

  contenidoInput='';
  seguida=false;
  logueado=false;

  
  
  @Output() lanzarPeticion = new EventEmitter<string>();
  @Output() detallesMonedas = new EventEmitter<string>();

  constructor(public ajax:PeticionesAjaxService, private router:Router, private firestore: Firestore){

    
  }
  ngOnInit(){

    this.ajax.peticionAjax();
  }


  
 



  detallesMoneda(criptoMoneda: any) {
    this.ajax.obtenerDetalles(criptoMoneda.id);
    console.log('Detalles de la moneda:', criptoMoneda.id);
  }

  enviarDetalle(id:any){
    console.log("Navigating datalle del "+ id );
    this.router.navigate(["detalle/",id])
  }
  


  seguirMoneda(criptoMonedaNombre: string, criptoMonedaImagen: string, criptoMonedaSymbol: string, criptoMonedaId: string) {
    this.ajax.estaUsuarioIniciadoSesion().then((logueado) => {
      if (logueado) {
        // El usuario está logueado, realiza la acción de seguir la moneda
        this.ajax.seguirMoneda(criptoMonedaNombre, criptoMonedaImagen, criptoMonedaSymbol,criptoMonedaId);
        this.seguida = true;
        setTimeout(() => {
          this.seguida = false;
        }, 3000);
      } else {
        // El usuario no está logueado, puedes mostrar un mensaje o redirigirlo a la página de inicio de sesión
        this.logueado = true;
        setTimeout(() => {
          this.logueado = false;
        }, 3000);
        // Puedes redirigir al usuario a la página de inicio de sesión, por ejemplo:
        // this.router.navigate(['/login']);
      }
    });
  }

  
}
