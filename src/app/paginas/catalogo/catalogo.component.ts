import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
export class CatalogoComponent {
  libros!: Libro[];
  nombre: any
  libro!: Libro

  constructor(private informacionService: InformacionService){}

  ngOnInit():void{
    this.informacionService.getLibros().subscribe(libros =>{
      this.libros = libros;
    })
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
