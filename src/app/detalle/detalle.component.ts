import { Component, Input, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeticionesAjaxService } from '../peticiones-ajax.service';
import { FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
declare var CanvasJS: any;



@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.css'
})
export class DetalleComponent implements OnInit {
  
  mostrarDescripcion = false;

  datosGrafica: any;
  chart: any;
  mostrarGrafica: boolean = false;

  constructor(public ajax:PeticionesAjaxService){

    
  }
@Input() datos:string = "";

@Input() id:string = "";

@Input() id2:string = "";

private route =inject(ActivatedRoute);

  ngOnInit():void
  {
    console.log("detalles "+this.id);
    this.ajax.obtenerDetalles(this.id);
    this.ajax.hacerGrafica(this.id);

    
  }

  construirGrafica() {
    console.log("detalles de la grafica ", this.ajax.datosGrafica);
    this.mostrarGrafica = true;
    if (this.ajax.datosGrafica) {
      // Utilizar setTimeout para asegurar que el contenedor esté presente en el DOM
      setTimeout(() => {
        const chartContainer = document.getElementById('chartContainer');
  
        // Verificar si el contenedor existe antes de construir la gráfica
        if (chartContainer) {
          this.chart = new CanvasJS.Chart('chartContainer', {
            animationEnabled: true,
            theme: 'dark',
            title: {
              text: 'Precio de la Moneda en los últimos 30 días'
            },
            axisX: {
              title: 'Fecha',
              valueFormatString: 'DD MMM'
            },
            axisY: {
              title: 'Precio en EUR'
            },
            data: [{
              type: 'line',
              dataPoints: this.ajax.datosGrafica.map((price: any) => ({
                x: new Date(price[0]),
                y: price[1]
              }))
            }]
          });
  
          this.chart.render();
        }
      }, 100); // Esperar 100 milisegundos (puedes ajustar este valor según sea necesario)
    }
  }


  cleanHomepageLink(link: string): string {
    return typeof link === 'string' ? link.replace(/,+$/, '') : link || '';
  }

  toggleGrafica() {
    if (this.mostrarGrafica) {  
      // Si la gráfica está mostrada, ocúltala
      this.mostrarGrafica = false;
    } else {
      // Si la gráfica no está mostrada, constrúyela y muéstrala
      this.construirGrafica();
    }
  }
}