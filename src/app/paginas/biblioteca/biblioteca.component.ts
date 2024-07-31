import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InformacionService } from '../../services/informacion.service';
import Libro from '../../domain/libro';
import Categoria from '../../domain/categoria';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-biblioteca',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './biblioteca.component.html',
  styleUrls: ['./biblioteca.component.scss']
})
export class BibliotecaComponent implements OnInit {

  formulario: FormGroup;
  libros!: Libro[];
  librosFiltrados!: Libro[];
  libroEnEdicion: Libro | null = null;
  categorias: Categoria[] = [
    { nombre: 'Autores' },
    { nombre: 'Titulos' },
    { nombre: 'Disponibilidad' },
    { nombre: 'Categoria' }
  ];
  categoriasDisponibles: Categoria[] = [];
  filteredCategorias: Categoria[] = [];
  autores: string[] = [];
  mostrarAutores = false;
  mostrarCategorias = false;

  constructor(private informacionService: InformacionService) {
    this.formulario = new FormGroup({
      nombre: new FormControl(),
      precio: new FormControl(),
      autor: new FormControl(),
      imagen: new FormControl(),
      disponible: new FormControl(true),
      categoria: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.informacionService.getLibros().subscribe(libros => {
      this.libros = libros;
      this.librosFiltrados = libros;
      this.autores = [...new Set(libros.map(libro => libro.autor))];
      this.categoriasDisponibles = this.obtenerCategoriasDisponibles(libros);
    });
  }

  obtenerCategoriasDisponibles(libros: Libro[]): Categoria[] {
    const categoriasUnicas = [...new Set(libros.map(libro => libro.categoria.nombre))];
    return categoriasUnicas.map(nombre => ({ nombre }));
  }

  filterCategorias() {
    const query = this.formulario.get('categoria')?.value.toLowerCase();
    if (query) {
      this.filteredCategorias = this.categoriasDisponibles.filter(cat => cat.nombre.toLowerCase().includes(query));
    } else {
      this.filteredCategorias = [];
    }
  }

  selectCategoria(categoria: Categoria) {
    this.formulario.patchValue({ categoria: categoria.nombre });
    this.filteredCategorias = [];
  }

  toggleMostrarAutores() {
    this.mostrarAutores = !this.mostrarAutores;
  }

  toggleMostrarCategorias() {
    this.mostrarCategorias = !this.mostrarCategorias;
  }

  filtrarPorAutorEspecifico(autor: string): void {
    this.librosFiltrados = this.libros.filter(libro => libro.autor === autor);
    this.mostrarAutores = false;
  }

  filtrarPorCategoriaEspecifica(categoria: Categoria): void {
    this.librosFiltrados = this.libros.filter(libro => libro.categoria.nombre === categoria.nombre);
    this.mostrarCategorias = false;
  }

  async onSubmit() {
    const libro: Libro = {
      codigo: this.libroEnEdicion ? this.libroEnEdicion.codigo : undefined,
      nombre: this.formulario.get('nombre')?.value,
      precio: this.formulario.get('precio')?.value,
      autor: this.formulario.get('autor')?.value,
      imagen: this.formulario.get('imagen')?.value,
      disponible: this.formulario.get('disponible')?.value,
      categoria: { nombre: this.formulario.get('categoria')?.value }
    };

      try {
        const response = await firstValueFrom(this.informacionService.updateLibro(libro));
        console.log(response);
      } catch (error) {
        console.error('Error updating libro:', error);
      }
    

    this.formulario.reset({
      disponible: true,
      categoria: ''
    });
    this.libroEnEdicion = null;
    this.informacionService.getLibros().subscribe(libros => {
      this.libros = libros;
      this.librosFiltrados = libros;
    });
  }

  async delete(libro: Libro) {
    try {
      const response = await firstValueFrom(this.informacionService.deleteLibro(libro.nombre));
      console.log(response);
      this.informacionService.getLibros().subscribe(libros => {
        this.libros = libros;
        this.librosFiltrados = libros;
      });
    } catch (error) {
      console.error('Error deleting libro:', error);
    }
  }

  edit(libro: Libro) {
    this.libroEnEdicion = libro;
    this.formulario.patchValue({
      nombre: libro.nombre,
      precio: libro.precio,
      autor: libro.autor,
      imagen: libro.imagen,
      disponible: libro.disponible,
      categoria: libro.categoria.nombre
    });
  }
}
