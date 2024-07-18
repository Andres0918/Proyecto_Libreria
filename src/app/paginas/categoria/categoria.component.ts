import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-categoria',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.scss'
})
export class CategoriaComponent implements OnInit{
  filtros = [
    {
      imagen: 'assets/images/categorias.png',
      titulo: 'Categorías',
      descripcion: 'Filtrar por categorías'
    },
    {
      imagen: 'assets/images/autores.png',
      titulo: 'Autores',
      descripcion: 'Filtrar por autores'
    },
    {
      imagen: 'assets/images/titulos.png',
      titulo: 'Títulos',
      descripcion: 'Filtrar por títulos'
    },
    {
      imagen: 'assets/images/disponibilidad.png',
      titulo: 'Dispo.',
      descripcion: 'Filtrar por disponibilidad'
    }
  ];

  constructor() {}

  ngOnInit(): void {}

  volver() {
    // Implementa la lógica para volver a la pantalla anterior
  }
}
