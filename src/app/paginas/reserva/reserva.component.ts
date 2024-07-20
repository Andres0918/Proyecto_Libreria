import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import Libro from '../../domain/libro';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-reserva',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.scss']
})
export class ReservaComponent {
  @Input() libroSeleccionado!: Libro;
}
