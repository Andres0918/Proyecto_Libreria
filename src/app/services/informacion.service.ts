import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { enviroment } from '../enviroments/enviroment';
import Libro from '../domain/libro';

@Injectable({
  providedIn: 'root'
})
export class InformacionService {
  constructor(private http: HttpClient) {}

  addLibro(libro: Libro): Observable<Libro> {
    let url = `${enviroment.WS_PATH}/libros`;
    return this.http.post<Libro>(url, libro);
  }

  getLibros(): Observable<Libro[]> {
    let url = `${enviroment.WS_PATH}/libros`;
    return this.http.get<Libro[]>(url);
  }

  getLibro(nombre: string): Observable<Libro> {
    let url = `${enviroment.WS_PATH}/libros/${nombre}`;
    return this.http.get<Libro>(url);
  }

  deleteLibro(nombre: string): Observable<void> {
    let url = `${enviroment.WS_PATH}/libros`;
    return this.http.delete<void>(url, { params: { nombre } });
  }

  updateLibro(libro: Libro): Observable<Libro> {
    let url = `${enviroment.WS_PATH}/libros`;
    return this.http.put<Libro>(url, libro);
  }

  getLibrosPorAutor(autor: string): Observable<Libro[]> {
    let url = `${enviroment.WS_PATH}/libros/autor/${autor}`;
    return this.http.get<Libro[]>(url);
  }

  getLibrosPorCategoria(categoria: string): Observable<Libro[]> {
    let url = `${enviroment.WS_PATH}/libros/categorias/${categoria}`;
    return this.http.get<Libro[]>(url);
  }

  getLibrosPorDisponibilidad(disponibilidad: boolean): Observable<Libro[]> {
    let url = `${enviroment.WS_PATH}/libros/disponibilidad/${disponibilidad}`;
    return this.http.get<Libro[]>(url);
  }

  generarReporteHistorial(): Observable<Blob> {
    let url = `${enviroment.WS_PATH}/prestamos/historial/historial-prestamos-pdf`;
    return this.http.get(url, { responseType: 'blob' });
  }

  generarReporteReservasEntreFechas(fechaInicio: string, fechaFin: string): Observable<Blob> {
    let url = `${enviroment.WS_PATH}/prestamos/reservas-entre-fechas-pdf`;
    return this.http.get(url, { 
      params: { fechaInicio, fechaFin },
      responseType: 'blob'
    });
  }
}
