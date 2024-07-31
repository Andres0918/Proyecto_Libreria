import { Component, OnInit } from '@angular/core';
import { CarruselComponent } from "../../components/carrusel/carrusel.component";
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { InformacionService } from '../../services/informacion.service';
import { UserService } from '../../services/user.service';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-inicio',
  standalone: true,
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
  imports: [CarruselComponent, RouterLink]
})
export class InicioComponent implements OnInit {
  usuarioLoggeado: User | null = null;

  constructor(
    private authService: AuthService,
    private informacionService: InformacionService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(user => {
      this.usuarioLoggeado = user;
      if (this.usuarioLoggeado) {
        this.verificarPrestamosUsuario(this.usuarioLoggeado.email);
      }
    });
  }

  verificarPrestamosUsuario(email: string | null): void {
    if (email) {
      this.informacionService.getPrestamosByUsuario(email).subscribe(prestamos => {
        if (prestamos.length > 0) {
          window.alert(`Usted tiene ${prestamos.length} préstamos`);
        }
      }, error => {
        console.error('Error al obtener los préstamos del usuario:', error);
      });
    }
  }
}
