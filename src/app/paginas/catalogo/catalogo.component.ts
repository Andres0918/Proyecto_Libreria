import { Component, OnInit, HostListener } from '@angular/core';
import { InformacionService } from '../../services/informacion.service';
import Libro from '../../domain/libro';
import Categoria from '../../domain/categoria'; // Asegúrate de tener este import
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})
export class CatalogoComponent implements OnInit {
  libros!: Libro[];
  librosFiltrados!: Libro[];
  nombre: any;
  categorias = [
    { nombre: 'Autores' },
    { nombre: 'Titulos' },
    { nombre: 'Disponibilidad' },
    { nombre: 'Categoria' }
  ];
  autores: string[] = [];
  categoriasDisponibles: Categoria[] = []; // Para almacenar las categorías disponibles
  mostrarFiltro = true; // Mostrar por defecto
  mostrarAutores = false;
  mostrarCategorias = false;
  isSmallScreen = false;

  constructor(private informacionService: InformacionService) { }

  ngOnInit(): void {
    this.informacionService.getLibros().subscribe(libros => {
      this.libros = libros;
      this.librosFiltrados = libros;
      this.autores = [...new Set(libros.map(libro => libro.autor))]; // Obtener lista única de autores
      this.categoriasDisponibles = this.obtenerCategoriasDisponibles(libros); // Obtener lista única de categorías
    });
    this.checkScreenSize();
  }

  obtenerCategoriasDisponibles(libros: Libro[]): Categoria[] {
    const categoriasUnicas = [...new Set(libros.map(libro => libro.categoria.nombre))];
    return categoriasUnicas.map(nombre => ({ nombre }));
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.checkScreenSize();
  }

  checkScreenSize(): void {
    this.isSmallScreen = window.innerWidth <= 768;
    if (!this.isSmallScreen) {
      this.mostrarFiltro = true; // Mostrar filtro en pantallas grandes
    }
  }

  toggleFiltro(): void {
    if (this.isSmallScreen) {
      this.mostrarFiltro = !this.mostrarFiltro;
    }
  }

  filtrarPorCategoria(categoria: any): void {
    switch (categoria.nombre) {
      case 'Autores':
        this.mostrarAutores = !this.mostrarAutores; // Toggle autores
        break;
      case 'Disponibilidad':
        this.filtrarPorDisponibilidad();
        break;
      case 'Categoria':
        this.mostrarCategorias = !this.mostrarCategorias; // Toggle categorías
        break;
      default:
        this.librosFiltrados = this.libros;
    }
  }

  filtrarPorAutor(autor: string): void {
    this.informacionService.getLibrosPorAutor(autor).subscribe(libros => {
      this.librosFiltrados = libros;
      this.mostrarAutores = false; // Cerrar el desplegable después de seleccionar un autor
    });
  }

  filtrarPorDisponibilidad(): void {
    this.informacionService.getLibrosPorDisponibilidad(true).subscribe(libros => {
      this.librosFiltrados = libros;
    });
  }

  filtrarPorCategoriaEspecifica(categoria: Categoria): void {
    this.informacionService.getLibrosPorCategoria(categoria.nombre).subscribe(libros => {
      this.librosFiltrados = libros;
      this.mostrarCategorias = false; // Cerrar el desplegable después de seleccionar una categoría
    });
  }

  filtro(): void {
    if (this.nombre === '' || this.nombre === undefined) {
      alert('Ingrese un nombre');
    } else {
      this.informacionService.getLibro(this.nombre).subscribe(libros => {
        this.librosFiltrados = [libros];
      });
    }
  }
}
