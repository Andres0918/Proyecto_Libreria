import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InformacionService } from '../../services/informacion.service';
import Libro from '../../domain/libro';
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
  libroEnEdicion: Libro | null = null;

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
    });

    this.getImages();
  }

  async onSubmit() {
    const libro: Libro = {
      nombre: this.formulario.get('nombre')?.value,
      precio: this.formulario.get('precio')?.value,
      autor: this.formulario.get('autor')?.value,
      imagen: this.formulario.get('imagen')?.value
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
    this.getImages();
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
