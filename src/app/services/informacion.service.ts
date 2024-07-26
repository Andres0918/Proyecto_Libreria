import { Injectable } from '@angular/core';
import { Firestore, collectionData, doc, updateDoc } from '@angular/fire/firestore';
import Libro from '../domain/libro';
import { addDoc, collection, deleteDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { enviroment } from '../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class InformacionService {

  constructor(private firestore: Firestore, private http: HttpClient) { }

  addLibro(libro: Libro) {
    let url = enviroment.WS_PATH + "/libros"
    return this.http.post<any>(url, libro)
  }

  getLibros(): Observable<Libro[]> {
    let url = enviroment.WS_PATH + "/libros"
    return this.http.get<any>(url)
  }

  getlibro(nombre: any): Observable<Libro>{
    let url = enviroment.WS_PATH + "/libros/"+ nombre
    return this.http.get<any>(url)
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
