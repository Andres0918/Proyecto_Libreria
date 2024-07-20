import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categoria',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent implements OnInit {
  filtros = [
    {
      imagen: 'assets/ic_categoria.webp',
      titulo: 'Categorías',
      descripcion: 'Filtrar por categorías'
    },
    {
      imagen: 'assets/ic_autor.png',
      titulo: 'Autores',
      descripcion: 'Filtrar por autores'
    },
    {
      imagen: 'assets/ic_titulo.png',
      titulo: 'Títulos',
      descripcion: 'Filtrar por títulos'
    },
    {
      imagen: 'assets/ic_dispo.png',
      titulo: 'Dispo.',
      descripcion: 'Filtrar por disponibilidad'
    }
  ];

  filtroSeleccionado: any = null;
  items: any[] = [];

  constructor() {}

  ngOnInit(): void {}

  seleccionarFiltro(filtro: any) {
    this.filtroSeleccionado = filtro;
    this.cargarItems();
  }

  cargarItems() {
    if (this.filtroSeleccionado.titulo === 'Autores') {
      this.items = [
        {
          nombre: 'Autor 1',
          mostrarLibros: false,
          libros: ['Libro A', 'Libro B', 'Libro C']
        },
        {
          nombre: 'Autor 2',
          mostrarLibros: false,
          libros: ['Libro D', 'Libro E']
        }
      ];
    } else if (this.filtroSeleccionado.titulo === 'Categorías') {
      this.items = [
        {
          nombre: 'Categoría 1',
          mostrarLibros: false,
          libros: ['Libro A', 'Libro B', 'Libro C']
        },
        {
          nombre: 'Categoría 2',
          mostrarLibros: false,
          libros: ['Libro D', 'Libro E']
        }
      ];
    } else if (this.filtroSeleccionado.titulo === 'Títulos' || this.filtroSeleccionado.titulo === 'Dispo.') {
      this.items = [
        {
          nombre: 'Título 1',
        },
        {
          nombre: 'Título 2',
        }
      ];
    }
  }

  toggleLibros(item: any) {
    item.mostrarLibros = !item.mostrarLibros;
  }

  mostrarAcciones(): boolean {
    return this.filtroSeleccionado.titulo !== 'Títulos' && this.filtroSeleccionado.titulo !== 'Dispo.';
  }
}
