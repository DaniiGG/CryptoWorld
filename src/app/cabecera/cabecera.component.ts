import { Component, OnInit } from '@angular/core';

import { RouterModule } from '@angular/router';


import { FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';

import { PeticionesAjaxService } from '../peticiones-ajax.service';

import { EventEmitter, Output } from '@angular/core';

import { Router } from '@angular/router';



@Component({
  selector: 'app-cabecera',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './cabecera.component.html',
  styleUrl: './cabecera.component.css'
})
export class CabeceraComponent implements OnInit{


  usuarioIniciadoSesion: boolean = false;
  items:any[]=[];

    contenidoInput='';
    mostrarLoader = false;
    nombreUsuario: string = '';
    fotoPerfil: string = '';
    mostrarDesplegable: boolean = false;

  ngOnInit(){
    console.log("Se inicia el componente cabecera");
    setInterval(() => {
      this.verificarSesion();
    }, 500);
    }

    
    
    
    @Output() lanzarPeticion = new EventEmitter<string>();
    @Output() detallesMonedas = new EventEmitter<string>();
  
    constructor(public ajax:PeticionesAjaxService, private router:Router){
  
      
    }
  
  
  
    buscar() {
      this.ajax.buscaCoin(this.contenidoInput); 
      this.router.navigate(["busqueda"]);
    }
    
   
  
  
  
    mostrarDetalle(id:any){
      console.log("Navigating datalle del "+ id);
      this.router.navigate(["detalle/",id])
    }

    async verificarSesion() {
      this.usuarioIniciadoSesion = await this.ajax.estaUsuarioIniciadoSesion();
      if (this.usuarioIniciadoSesion) {
        // Llamar a la función Usuario() después de verificar la sesión
        await this.ajax.Usuario();
        
        // Obtener el nombre del usuario desde la información almacenada
        this.nombreUsuario = this.ajax.usuario?.displayName || '';
        this.fotoPerfil = this.ajax.usuario?.photoURL || '';
      }
    }

    cerrarSesion(){
      this.ajax.cerrarSesion();
      this.usuarioIniciadoSesion=false;
      this.router.navigate(["cuerpo/"])
      
    }

    toggleDesplegable() {
      this.mostrarDesplegable = !this.mostrarDesplegable;
    }
}
