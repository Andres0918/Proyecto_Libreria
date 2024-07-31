import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import Libro from '../../domain/libro';
import { InformacionService } from '../../services/informacion.service';

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss']
})
export class HistorialComponent implements OnInit {
  libros!: Libro[];

  constructor(private informacionService: InformacionService) {}

  ngOnInit(): void {
    this.informacionService.getLibros().subscribe(libros => {
      this.libros = libros;
    });
  }

  generarReporteHistorial(): void {
    this.informacionService.generarReporteHistorial().subscribe(response => {
      const blob = new Blob([response], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'historial_prestamos.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  }

  generarReporteReservas(): void {
    const fechaInicio = (document.getElementById('startDate') as HTMLInputElement).value;
    const fechaFin = (document.getElementById('endDate') as HTMLInputElement).value;
    this.informacionService.generarReporteReservasEntreFechas(fechaInicio, fechaFin).subscribe(response => {
      const blob = new Blob([response], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'reservas_entre_fechas.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  }
}
