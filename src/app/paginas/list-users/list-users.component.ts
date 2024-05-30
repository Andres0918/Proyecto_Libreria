import { Component } from '@angular/core';
import { Firestore, collection } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { user } from '../../domain/user';
import { collectionData, doc, updateDoc } from '@angular/fire/firestore';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-users',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.scss'
})
export class ListUsersComponent {
  usuarios: user[] = [];
  formulario: FormGroup;
  usuarioEnEdicion: user | null = null;

  constructor(private usuariosService: UserService) {
    this.formulario = new FormGroup({
      nombre: new FormControl(),
      email: new FormControl(),
    });
  }

  ngOnInit(): void {
    this.usuariosService.getUsuarios().subscribe(usuarios => {
      this.usuarios = usuarios;
    });
  }

  async onSubmit() {
    if (!this.usuarioEnEdicion) return;

    const updatedUsuario: Partial<user> = {
      email: this.formulario.get('email')?.value,
      password: this.formulario.get('password')?.value
    };

    await this.usuariosService.updateUsuario(this.usuarioEnEdicion.uid!, updatedUsuario);

    this.formulario.reset();
    this.usuarioEnEdicion = null; // Reiniciar el usuario en edición
  }

  edit(usuario: user) {
    this.usuarioEnEdicion = usuario;
    this.formulario.patchValue({
      email: usuario.email,
      password: usuario.password
    });
  }
}
