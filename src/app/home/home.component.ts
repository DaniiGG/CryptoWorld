import { Component, OnInit } from '@angular/core';
import { PeticionesAjaxService } from '../peticiones-ajax.service';

import { EventEmitter, Output } from '@angular/core';

import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {


  items:any[]=[];

  contenidoInput='';

  
  
  @Output() lanzarPeticion = new EventEmitter<string>();
  @Output() detallesMonedas = new EventEmitter<string>();

  constructor(public ajax:PeticionesAjaxService, private router:Router){

    
  }
  ngOnInit(){

    this.ajax.peticionAjax();
  }


  buscar() {
    this.ajax.buscaCoin(this.contenidoInput); 
    this.lanzarPeticion.emit("Peticion en dusul")
  }
  
 

  nuevoValor(){
    //this.items.push(this.contenidoInput);
  }


  detallesMoneda(criptoMoneda: any) {
    this.ajax.obtenerDetalles(criptoMoneda.id);
    console.log('Detalles de la moneda:', criptoMoneda.id);
  }

  enviarDetalle(id:any){
    console.log("Navigating datalle del "+ id);
    this.router.navigate(["detalle/",id])
  }

}
