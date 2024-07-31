import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InformacionService } from '../../services/informacion.service';
import Libro from '../../domain/libro';
import Categoria from '../../domain/categoria';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router'; // Importa el Router

@Component({
  selector: 'app-biblioteca',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
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

  constructor(private informacionService: InformacionService, private router: Router) { // Inyecta el Router
    this.formulario = new FormGroup({
      nombre: new FormControl('', Validators.required),
      precio: new FormControl('', Validators.required),
      autor: new FormControl('', Validators.required),
      imagen: new FormControl('', Validators.required),
      disponible: new FormControl(true),
      categoria: new FormControl('', Validators.required)
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
    const categoriasUnicas = [...new Set(libros.map(libro => libro.categoriaNombre))];
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
    this.librosFiltrados = this.libros.filter(libro => libro.categoriaNombre === categoria.nombre);
    this.mostrarCategorias = false;
  }

  async onSubmit() {
    if (this.formulario.valid) {
      const libro: Libro = {
        codigo: this.libroEnEdicion ? this.libroEnEdicion.codigo : undefined,
        nombre: this.formulario.get('nombre')?.value,
        precio: parseFloat(this.formulario.get('precio')?.value), // Asegurarse de que el precio sea un número
        autor: this.formulario.get('autor')?.value,
        imagen: this.formulario.get('imagen')?.value,
        disponible: this.formulario.get('disponible')?.value,
        categoriaNombre: this.formulario.get('categoria')?.value
      };

      console.log(libro); // Añadido para verificar que los datos del libro son correctos

      try {
        if (this.libroEnEdicion) {
          // Actualizar libro existente
          const response = await firstValueFrom(this.informacionService.updateLibro(libro));
          console.log('Book updated successfully', response);
        } else {
          // Agregar nuevo libro
          const response = await firstValueFrom(this.informacionService.addLibro(libro));
          console.log('Book added successfully', response);
        }
        this.resetForm();
      } catch (error) {
        console.error('Error updating or adding book:', error);
      }
    }
  }

  resetForm() {
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
      console.log('Book deleted successfully', response);
      this.informacionService.getLibros().subscribe(libros => {
        this.libros = libros;
        this.librosFiltrados = libros;
      });
    } catch (error) {
      console.error('Error deleting book:', error);
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
      categoria: libro.categoriaNombre
    });
  }

  devolver(libro: Libro) {
    window.location.href = `http://192.168.184.209/proyectoFinal/devolucion.xhtml?libroNombre=${libro.nombre}`;
  }
}
