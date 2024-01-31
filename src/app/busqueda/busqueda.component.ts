import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';

import { PeticionesAjaxService } from '../peticiones-ajax.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-busqueda',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './busqueda.component.html',
  styleUrl: './busqueda.component.css'
})
export class BusquedaComponent {

  items:any[]=[];

  contenidoInput='';
  mostrarLoader = false;
  seguida=false;
  logueado=false;

  
  constructor(public ajax:PeticionesAjaxService, private router:Router){

    
  }
  ngOnInit(){
    
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
      } else {
        // El usuario no está logueado, puedes mostrar un mensaje o redirigirlo a la página de inicio de sesión
        this.logueado = true;
        // Puedes redirigir al usuario a la página de inicio de sesión, por ejemplo:
        // this.router.navigate(['/login']);
      }
    });
  }

}
