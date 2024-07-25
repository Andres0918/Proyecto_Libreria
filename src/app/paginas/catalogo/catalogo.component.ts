import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import Libro from '../../domain/libro';
import { InformacionService } from '../../services/informacion.service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { or } from 'firebase/firestore';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.scss'
})
export class CatalogoComponent implements OnInit {
  libros!: Libro[];
  categorias = [
    { nombre: 'Autores' },
    { nombre: 'Titulos' },
    { nombre: 'Disponibilidad' },
    { nombre: 'Categoria' }
  ];
  librosFiltrados!: Libro[];
  nombre: any
  libro!: Libro

  constructor(private informacionService: InformacionService){}

  ngOnInit(): void {
    this.informacionService.getLibros().subscribe(libros => {
      this.libros = libros;
      this.librosFiltrados = libros; // Inicialmente mostrar todos los libros
    });
  }

  filtrarPorCategoria(categoria: any): void {
    this.librosFiltrados = this.libros.filter(libro => categoria.nombre);
  }
  filtro(){
    if(this.nombre==='' || this.nombre===undefined){
      console.log('vacio')
      alert('Ingrese un nombre')
    }else{
      this.informacionService.getlibro(this.nombre).subscribe(libros =>{
        this.libro = libros
        this.libros=[]
        this.libros.push(this.libro)
        console.log(this.libros)
      })
    }
  }

}
