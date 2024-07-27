import { Component, OnInit, HostListener } from '@angular/core';
import { InformacionService } from '../../services/informacion.service';
import Libro from '../../domain/libro';
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
  mostrarFiltro = false;
  isSmallScreen = false;

  constructor(private informacionService: InformacionService) { }

  ngOnInit(): void {
    this.informacionService.getLibros().subscribe(libros => {
      this.libros = libros;
      this.librosFiltrados = libros; // Inicialmente mostrar todos los libros
    });
    this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.checkScreenSize();
  }

  checkScreenSize(): void {
    this.isSmallScreen = window.innerWidth <= 768;
  }

  toggleFiltro(): void {
    this.mostrarFiltro = !this.mostrarFiltro;
  }

  filtrarPorCategoria(categoria: any): void {
    switch (categoria.nombre) {
      case 'Autores':
        this.filtrarPorAutor();
        break;
      case 'Disponibilidad':
        this.filtrarPorDisponibilidad();
        break;
      case 'Categoria':
        this.filtrarPorCategoriaEspecifica();
        break;
      default:
        this.librosFiltrados = this.libros;
    }
  }

  filtrarPorAutor() {
    const autor = prompt("Ingrese el autor");
    if (autor) {
      this.informacionService.getLibrosPorAutor(autor).subscribe(libros => {
        this.librosFiltrados = libros;
      });
    }
  }


  filtrarPorDisponibilidad() {
    this.informacionService.getLibrosPorDisponibilidad(true).subscribe(libros => {
      this.librosFiltrados = libros;
    });
  }

  filtrarPorCategoriaEspecifica() {
    const categoria = prompt("Ingrese la categoría");
    if (categoria) {
      this.informacionService.getLibrosPorCategoria(categoria).subscribe(libros => {
        this.librosFiltrados = libros;
      });
    }
  }

  filtro(): void {
    if (this.nombre === '' || this.nombre === undefined) {
      console.log('vacio');
      alert('Ingrese un nombre');
    } else {
      this.informacionService.getLibro(this.nombre).subscribe(libros => {
        this.librosFiltrados = [libros];
        console.log(this.librosFiltrados);
      });
    }
  }
}
