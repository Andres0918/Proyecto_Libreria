import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InformacionService } from '../../services/informacion.service';
import Libro from '../../domain/libro';
import Categoria from '../../domain/categoria'; // Asegúrate de tener este import
import { CommonModule } from '@angular/common';
import { Storage, getDownloadURL, uploadBytes, listAll, deleteObject, ref } from '@angular/fire/storage';

@Component({
  selector: 'app-biblioteca',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './biblioteca.component.html',
  styleUrls: ['./biblioteca.component.scss']
})
export class BibliotecaComponent implements OnInit {

  images: string[];
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
  categoriasDisponibles: Categoria[] = []; // Para almacenar las categorías disponibles
  filteredCategorias: Categoria[] = [];
  autores: string[] = []; // Lista de autores
  mostrarAutores = false;
  mostrarCategorias = false;

  constructor(
    private informacionService: InformacionService, 
    private storage: Storage
  ) {
    this.formulario = new FormGroup({
      nombre: new FormControl(),
      precio: new FormControl(),
      autor: new FormControl(),
      imagen: new FormControl(),
      disponible: new FormControl(true), // Predeterminado a verdadero
      categoria: new FormControl('') // Campo de texto para la categoría
    });
    this.images = [];
  }

  ngOnInit(): void {
    this.informacionService.getLibros().subscribe(libros => {
      this.libros = libros;
      this.librosFiltrados = libros; // Inicialmente mostrar todos los libros
      this.autores = [...new Set(libros.map(libro => libro.autor))]; // Obtener lista única de autores
      this.categoriasDisponibles = this.obtenerCategoriasDisponibles(libros); // Obtener lista única de categorías
    });

    this.getImages();
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
      nombre: this.formulario.get('nombre')?.value,
      precio: this.formulario.get('precio')?.value,
      autor: this.formulario.get('autor')?.value,
      imagen: this.formulario.get('imagen')?.value,
      disponible: this.formulario.get('disponible')?.value,
      categoria: { nombre: this.formulario.get('categoria')?.value }
    };

    if (this.libroEnEdicion) {
      // Actualizar libro existente
      libro.id = this.libroEnEdicion.id;
      const response = await this.informacionService.updateLibro(libro);
      console.log(response);
    } else {
      // Crear nuevo libro
      const response = await this.informacionService.addLibro(libro);
      console.log(response);
    }

    this.formulario.reset({
      disponible: true,
      categoria: ''
    });
    this.libroEnEdicion = null; // Reiniciar el libro en edición
    this.informacionService.getLibros().subscribe(libros => {
      this.libros = libros;
      this.librosFiltrados = libros; // Reiniciar la lista filtrada
    });
  }

  async delete(libro: Libro) {
    const response = await this.informacionService.deleteLibro(libro);
    console.log(response);

    if (libro.imagen) {
      const imgRef = ref(this.storage, libro.imagen);
      await deleteObject(imgRef)
        .then(() => console.log("Imagen eliminada de Firebase Storage"))
        .catch(error => console.log("Error al eliminar la imagen de Firebase Storage", error));
    }

    this.informacionService.getLibros().subscribe(libros => {
      this.libros = libros;
      this.librosFiltrados = libros; // Reiniciar la lista filtrada
    });
  }

  uploadImage($event: any) {
    const file = $event.target.files[0];
    console.log(file);

    const imgRef = ref(this.storage, `images/${file.name}`);

    uploadBytes(imgRef, file)
      .then(async response => {
        console.log(response);
        const url = await getDownloadURL(imgRef);
        this.formulario.patchValue({ imagen: url }); // Actualizar el valor del control 'imagen' en el formulario
      })
      .catch(error => console.log(error));
  }

  getImages() {
    const imagesRef = ref(this.storage, 'images');
    listAll(imagesRef)
      .then(async response => {
        console.log(response);
        this.images = [];
        for (let item of response.items) { // Recorrer y obtener los items
          const url = await getDownloadURL(item);
          this.images.push(url);
        }
      })
      .catch(error => console.log(error));
  }

  filtrarPorCategoria(categoria: any): void {
    switch (categoria.nombre) {
      case 'Autores':
        this.toggleMostrarAutores();
        break;
      case 'Titulos':
        this.filtrarPorTitulo();
        break;
      case 'Disponibilidad':
        this.filtrarPorDisponibilidad();
        break;
      case 'Categoria':
        this.toggleMostrarCategorias();
        break;
      default:
        this.librosFiltrados = this.libros;
    }
  }

  filtrarPorTitulo() {
    this.librosFiltrados = this.libros.sort((a, b) => a.nombre.localeCompare(b.nombre));
  }

  filtrarPorDisponibilidad() {
    this.librosFiltrados = this.libros.filter(libro => libro.disponible);
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
