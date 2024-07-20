import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import Libro from '../../domain/libro';
import { InformacionService } from '../../services/informacion.service';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.scss'
})
export class CatalogoComponent {
  libros!: Libro[];

  constructor(private informacionService: InformacionService){}

  ngOnInit():void{
    this.informacionService.getLibros().subscribe(libros =>{
      this.libros = libros;
    })
  }


}
