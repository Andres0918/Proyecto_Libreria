import { Injectable } from '@angular/core';
import { Firestore, collectionData, doc, updateDoc } from '@angular/fire/firestore';
import Libro from '../domain/libro';
import { addDoc, collection, deleteDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InformacionService {

  constructor(private firestore: Firestore, private http: HttpClient) { }

  addLibro(libro: Libro) {
    const libroRef = collection(this.firestore, 'libros');
    return addDoc(libroRef, libro);
  }

  getLibros(): Observable<Libro[]> {
    const libroRef = collection(this.firestore, 'libros');
    return collectionData(libroRef, { idField: 'id' }) as Observable<Libro[]>;
  }

  deleteLibro(libro: Libro) {
    const libroDocRef = doc(this.firestore, `libros/${libro.id}`);
    return deleteDoc(libroDocRef);
  }

  updateLibro(libro: Libro) {
    const libroDocRef = doc(this.firestore, `libros/${libro.id}`);
    return updateDoc(libroDocRef, {
      nombre: libro.nombre,
      precio: libro.precio,
      autor: libro.autor,
      imagen: libro.imagen
    });
  }
}
