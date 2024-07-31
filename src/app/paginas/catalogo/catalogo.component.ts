import { Component, OnInit, HostListener } from '@angular/core';
import { InformacionService } from '../../services/informacion.service';
import Libro from '../../domain/libro';
import Categoria from '../../domain/categoria'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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
  categoriasDisponibles: Categoria[] = [];
  mostrarFiltro = true;
  mostrarAutores = false;
  mostrarCategorias = false;
  isSmallScreen = false;

  constructor(private informacionService: InformacionService, private router: Router) { }

  ngOnInit(): void {
    this.informacionService.getLibros().subscribe(libros => {
      this.libros = libros;
      this.librosFiltrados = libros;
      this.autores = [...new Set(libros.map(libro => libro.autor))];
      this.categoriasDisponibles = this.obtenerCategoriasDisponibles(libros);
    });
    this.checkScreenSize();
  }

  obtenerCategoriasDisponibles(libros: Libro[]): Categoria[] {
    const categoriasUnicas = [...new Set(libros.map(libro => libro.categoriaNombre))];
    return categoriasUnicas.map(nombre => ({ nombre }));
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.checkScreenSize();
  }

  checkScreenSize(): void {
    this.isSmallScreen = window.innerWidth <= 768;
    if (!this.isSmallScreen) {
      this.mostrarFiltro = true;
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
        this.mostrarAutores = !this.mostrarAutores;
        break;
      case 'Disponibilidad':
        this.filtrarPorDisponibilidad();
        break;
      case 'Categoria':
        this.mostrarCategorias = !this.mostrarCategorias;
        break;
      default:
        this.librosFiltrados = this.libros;
    }
  }

  filtrarPorAutor(autor: string): void {
    this.informacionService.getLibrosPorAutor(autor).subscribe(libros => {
      this.librosFiltrados = libros;
      this.mostrarAutores = false;
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
      this.mostrarCategorias = false;
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

  seleccionarLibro(libro: Libro): void {
    console.log('Seleccionado libro:', libro);
    this.informacionService.seleccionarLibro(libro);
    this.router.navigate(['/reserva']);
  }
}
