import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { InformacionService } from '../../services/informacion.service';
import { UserService } from '../../services/user.service';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-reserva',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.scss']
})
export class ReservaComponent implements OnInit{
  @ViewChild('modal') modalElement!: ElementRef;
  reservarFormulario: FormGroup;
  libroSeleccionado: any;
  usuarioLoggeado: User | null = null;

  constructor(
    private fb: FormBuilder,
    private informacionService: InformacionService,
    private userService: UserService,
    private router: Router
  ) {
    this.reservarFormulario = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      comments: ['']
    });
  }

  ngOnInit(): void {
    this.informacionService.libroSeleccionado$.subscribe(libro => {
      if (libro) {
        this.libroSeleccionado = libro;
        this.scrollToModal(); // Scroll to the modal when a book is selected
      }
    });

    this.userService.getCurrentUser().subscribe(user => {
      this.usuarioLoggeado = user;
      if (!this.usuarioLoggeado) {
        this.router.navigate(['/login']); // Redirect to login if no user is logged in
      } else {
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

  scrollToModal(): void {
    setTimeout(() => {
      if (this.modalElement) {
        this.modalElement.nativeElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 0);
  }

  onSubmit(): void {
    if (this.reservarFormulario.valid) {
      if (!this.usuarioLoggeado || !this.usuarioLoggeado.email) {
        console.error('Usuario no loggeado o email no encontrado');
        return;
      }

      const prestamo = {
        estado: 'Reservado',
        fechaInicio: this.reservarFormulario.get('fechaInicio')?.value,
        fechaFin: this.reservarFormulario.get('fechaFin')?.value,
        libroNombre: this.libroSeleccionado.nombre,
        libro: this.libroSeleccionado,
        usuarioEmail: this.usuarioLoggeado.email,
        usuario: {
          codigo: 2, // Ejemplo, deberías obtenerlo dinámicamente si tienes esta información
          rol: 'common', // Ejemplo, deberías obtenerlo dinámicamente si tienes esta información
          usuario: this.usuarioLoggeado.email
        },
        comments: this.reservarFormulario.get('comments')?.value // Añadir el comentario al préstamo
      };

      this.informacionService.crearPrestamo(prestamo).subscribe(response => {
        console.log(response);
        alert('Préstamo creado exitosamente');
        this.router.navigate(['/catalogo']);
      }, error => {
        console.error('Error al crear el préstamo:', error);
        alert('Error al crear el préstamo');
      });
    }
  }

  cancelarReserva(): void {
    this.router.navigate(['/catalogo']);
  }
}
