import { Component } from '@angular/core';
import { CarruselComponent } from "../../components/carrusel/carrusel.component";
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-inicio',
    standalone: true,
    templateUrl: './inicio.component.html',
    styleUrl: './inicio.component.scss',
    imports: [CarruselComponent, RouterLink]
})
export class InicioComponent {

}
