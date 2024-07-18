import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import Libro from '../../domain/libro';

@Component({
  selector: 'app-reserva',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.scss']
})
export class ReservaComponent {
  @Input() libroSeleccionado!: Libro;
}
