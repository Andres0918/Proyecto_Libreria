import { Component } from '@angular/core';
import { InformacionService } from '../../services/informacion.service';

@Component({
  selector: 'app-lista-libro',
  standalone: true,
  imports: [],
  templateUrl: './lista-libro.component.html',
  styleUrl: './lista-libro.component.scss'
})
export class ListaLibroComponent {
  constructor(informacionService: InformacionService){}


}
