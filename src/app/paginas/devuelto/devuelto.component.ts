import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import Libro from '../../domain/libro';
import { Router } from '@angular/router';

@Component({
  selector: 'app-devuelto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './devuelto.component.html',
  styleUrl: './devuelto.component.scss'
})
export class DevueltoComponent implements OnInit {
  libroSeleccionado!: Libro;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.libroSeleccionado = navigation.extras.state['libroSeleccionado'];
      console.log('Libro seleccionado para devolución:', this.libroSeleccionado);
    } else {
      console.error('No se encontraron datos del libro en el estado de navegación');
    }
  }
}
