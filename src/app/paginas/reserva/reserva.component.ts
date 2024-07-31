import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import Libro from '../../domain/libro';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reserva',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.scss']
})
export class ReservaComponent implements OnInit {
  libroSeleccionado!: Libro;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.libroSeleccionado = navigation.extras.state['libroSeleccionado'];
      console.log('Libro seleccionado:', this.libroSeleccionado);
    } else {
      console.error('No se encontraron datos del libro en el estado de navegación');
    }
  }
}
