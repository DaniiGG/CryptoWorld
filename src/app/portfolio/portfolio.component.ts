import { Component, OnInit } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';

import { PeticionesAjaxService } from '../peticiones-ajax.service';

import { EventEmitter, Output } from '@angular/core';

import { Router } from '@angular/router';



@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})
export class PortfolioComponent implements OnInit {
  // Asegúrate de que el tipo de datos coincida con la estructura de tus documentos

  datosFS:any[]=[];
  mostrarLoader: boolean = false;

  constructor(public ajax: PeticionesAjaxService,  private router:Router) {
    
  }

  ngOnInit() {
    this.mostrarLoader = true;
  
    this.ajax.obtenerDatos().then(() => {
      console.log("datos de monedas en dattosFS", this.ajax.datosFS);
  
      this.mostrarLoader = false;
    }).catch(error => {
      console.error('Error en ngOnInit:', error);
      this.mostrarLoader = false; // Manejar el error y actualizar el estado del loader
    });
  }


  cleanHomepageLink(link: string): string {
    return typeof link === 'string' ? link.replace(/,+$/, '') : link || '';
  }

  enviarDetalle(id:any){
    console.log("Navigating datalle del "+ id );
    this.router.navigate(["detalle/",id])
  }

  eliminarMoneda(uid:string, idMoneda: string) {
    console.log("moneda a borrar "+ idMoneda );
    this.ajax.eliminarMoneda(uid, idMoneda);
    
    setInterval(() => {
      this.ajax.obtenerDatos();
    }, 500);
  }

  
}
