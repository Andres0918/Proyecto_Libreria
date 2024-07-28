import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import Libro from '../../domain/libro';

@Component({
  selector: 'app-devuelto',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './devuelto.component.html',
  styleUrl: './devuelto.component.scss'
})
export class DevueltoComponent {
  @Input() libroSeleccionado!: Libro;
}
