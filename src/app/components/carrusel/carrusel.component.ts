import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-carrusel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrusel.component.html',
  styleUrl: './carrusel.component.scss'
})
export class CarruselComponent implements OnInit, OnDestroy {
  images = [
    { src: '../../../assets/libro1.jpg', alt: 'Imagen 1' },
    { src: '../../../assets/libro2.webp', alt: 'Imagen 2' },
    { src: '../../../assets/libro3.webp', alt: 'Imagen 3' },
    { src: '../../../assets/libro4.jpg', alt: 'Imagen 4' },
    { src: '../../../assets/libro5.webp', alt: 'Imagen 5' }
  ];
  currentIndex = 0;
  intervalTime = 5000; // Intervalo de tiempo en milisegundos
  slideInterval: any;

  ngOnInit(): void {
    this.startCarousel();
  }

  ngOnDestroy(): void {
    this.stopCarousel();
  }

  startCarousel(): void {
    // Ensure the first item is visible
    this.currentIndex = 0;

    // Start the slide
    this.slideInterval = setInterval(() => {
      this.moveCarousel(1);
    }, this.intervalTime);
  }

  stopCarousel(): void {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  moveCarousel(direction: number): void {
    const totalItems = this.images.length;

    this.currentIndex += direction;
    if (this.currentIndex >= totalItems) {
      this.currentIndex = 0;
    } else if (this.currentIndex < 0) {
      this.currentIndex = totalItems - 1;
    }
  }
}