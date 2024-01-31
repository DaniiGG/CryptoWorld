import { Routes } from '@angular/router';
import { DetalleComponent } from './detalle/detalle.component';
import { HomeComponent } from './home/home.component';
import { CuerpoComponent } from './cuerpo/cuerpo.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { SesionComponent } from './sesion/sesion.component';

export const routes: Routes = [

    { path: '', redirectTo: '/home', pathMatch: 'full' },
    {path: 'detalle/:id', component: DetalleComponent},
    {path: 'home', component: HomeComponent},
    {path: 'cuerpo', component: CuerpoComponent},
    {path: 'busqueda', component: BusquedaComponent},
    {path: 'portfolio', component: PortfolioComponent},
    {path: 'sesion', component: SesionComponent},
    
];
