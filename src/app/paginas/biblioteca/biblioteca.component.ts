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
  categorias = [
    { nombre: 'Autores' },
    { nombre: 'Titulos' },
    { nombre: 'Disponibilidad' },
    { nombre: 'Categoria' }
  ];

  constructor(
    private informacionService: InformacionService, 
    private storage: Storage
  ) {
    this.formulario = new FormGroup({
      nombre: new FormControl(),
      precio: new FormControl(),
      autor: new FormControl(),
      imagen: new FormControl()
    });
    this.images = [];
  }

  ngOnInit(): void {
    this.informacionService.getLibros().subscribe(libros => {
      this.libros = libros;
      this.librosFiltrados = libros; // Inicialmente mostrar todos los libros
    });

    this.getImages();
  }

  async onSubmit() {
    const libro: Libro = {
      nombre: this.formulario.get('nombre')?.value,
      precio: this.formulario.get('precio')?.value,
      autor: this.formulario.get('autor')?.value,
      imagen: this.formulario.get('imagen')?.value,
      disponible: true, // Asignar un valor predeterminado
      categoria: { nombre: 'Categoría predeterminada' } // Asignar una categoría predeterminada
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

    this.formulario.reset();
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
        this.filtrarPorAutor();
        break;
      case 'Titulos':
        this.filtrarPorTitulo();
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
    this.librosFiltrados = this.libros.sort((a, b) => a.autor.localeCompare(b.autor));
  }

  filtrarPorTitulo() {
    this.librosFiltrados = this.libros.sort((a, b) => a.nombre.localeCompare(b.nombre));
  }

  filtrarPorDisponibilidad() {
    this.librosFiltrados = this.libros.filter(libro => libro.disponible);
  }

  filtrarPorCategoriaEspecifica() {
    this.librosFiltrados = this.libros.filter(libro => libro.categoria.nombre === 'algunaCategoria');
  }

  edit(libro: Libro) {
    this.libroEnEdicion = libro;
    this.formulario.patchValue({
      nombre: libro.nombre,
      precio: libro.precio,
      autor: libro.autor,
      imagen: libro.imagen
    });
  }
}
