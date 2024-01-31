import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {FormsModule} from '@angular/forms';
import {CabeceraComponent} from './cabecera/cabecera.component';
import {CuerpoComponent} from './cuerpo/cuerpo.component';
import {DetalleComponent} from './detalle/detalle.component';
import {FooterComponent} from './footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, CabeceraComponent, CuerpoComponent, FooterComponent, DetalleComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{



  ngOnInit(){
    console.log("oninit");
    }
    
    
}

