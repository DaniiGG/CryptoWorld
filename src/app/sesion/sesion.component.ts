import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';

import { PeticionesAjaxService } from '../peticiones-ajax.service';

import { EventEmitter, Output } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-sesion',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './sesion.component.html',
  styleUrl: './sesion.component.css'
})
export class SesionComponent {

  constructor(public ajax:PeticionesAjaxService, private router:Router){

    
  }

  inicioSesion(){
    this.ajax.iniciarSesion(); 
    
  }

  registrarUsuario(nombre: string, email: string, password: string): void {
    this.ajax.registrarUsuario(nombre, email, password);
     
  }

  iniciarSesionConCorreo(email: string, password: string){
    this.ajax.iniciarSesionConCorreo(email, password);
    
  }
  iniciarSesionConGitHub(): void {
    this.ajax.iniciarSesionConGitHub()
  }

}
