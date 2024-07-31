import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { enviroment } from '../enviroments/enviroment';
import Libro from '../domain/libro';

@Injectable({
  providedIn: 'root'
})
export class InformacionService {
  private baseUrl = `${enviroment.WS_PATH}/libros`;
  private prestamoUrl = `${enviroment.WS_PATH}/prestamos`;
  private libroSeleccionadoSubject = new BehaviorSubject<Libro | null>(null);
  libroSeleccionado$ = this.libroSeleccionadoSubject.asObservable();

  constructor(private http: HttpClient) {}

  addLibro(libro: Libro): Observable<Libro> {
    const libroPayload = { ...libro, categoriaNombre: libro.categoriaNombre };
    return this.http.post<Libro>(this.baseUrl, libroPayload);
  }

  getLibros(): Observable<Libro[]> {
    return this.http.get<Libro[]>(this.baseUrl).pipe(
      map(libros => libros.map(libro => ({
        ...libro,
        categoria: libro.categoriaNombre
      })))
    );
  }

  getLibro(nombre: string): Observable<Libro> {
    return this.http.get<Libro>(`${this.baseUrl}/${nombre}`).pipe(
      map(libro => ({
        ...libro,
        categoria: libro.categoriaNombre
      }))
    );
  }

  deleteLibro(nombre: string): Observable<void> {
    return this.http.delete<void>(this.baseUrl, { params: { nombre } });
  }

  updateLibro(libro: Libro): Observable<Libro> {
    const libroPayload = { ...libro, categoriaNombre: libro.categoriaNombre };
    return this.http.put<Libro>(this.baseUrl, libroPayload);
  }

  getLibrosPorAutor(autor: string): Observable<Libro[]> {
    let url = `${this.baseUrl}/autor/${autor}`;
    return this.http.get<Libro[]>(url).pipe(
      map(libros => libros.map(libro => ({
        ...libro,
        categoria: libro.categoriaNombre
      })))
    );
  }

  getLibrosPorCategoria(categoria: string): Observable<Libro[]> {
    let url = `${this.baseUrl}/categorias/${categoria}`;
    return this.http.get<Libro[]>(url).pipe(
      map(libros => libros.map(libro => ({
        ...libro,
        categoria: libro.categoriaNombre
      })))
    );
  }

  getLibrosPorDisponibilidad(disponibilidad: boolean): Observable<Libro[]> {
    let url = `${this.baseUrl}/disponibilidad/${disponibilidad}`;
    return this.http.get<Libro[]>(url).pipe(
      map(libros => libros.map(libro => ({
        ...libro,
        categoria: libro.categoriaNombre
      })))
    );
  }

  generarReporteHistorial(): Observable<Blob> {
    let url = `${enviroment.WS_PATH}/prestamos/historial/historial-prestamos-pdf`;
    return this.http.get(url, { responseType: 'blob' });
  }

  generarReporteReservasEntreFechas(fechaInicio: string, fechaFin: string): Observable<Blob> {
    let url = `${this.baseUrl}/prestamos/reservas-entre-fechas-pdf`;
    return this.http.get(url, { 
      params: { fechaInicio, fechaFin },
      responseType: 'blob'
    });
  }

  seleccionarLibro(libro:Libro){
    this.libroSeleccionadoSubject.next(libro);
  }

  crearPrestamo(prestamo: any): Observable<any>{
    return this.http.post<any>(this.prestamoUrl, prestamo);
  }

  getPrestamosByUsuario(usuarioEmail: string): Observable<any[]> {
    const url = `${this.prestamoUrl}/usuario/${usuarioEmail}`;
    return this.http.get<any[]>(url);
  }

}
