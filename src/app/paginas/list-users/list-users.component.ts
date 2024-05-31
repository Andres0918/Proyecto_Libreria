import { Component } from '@angular/core';
import { Firestore, collection } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { user } from '../../domain/user';
import { collectionData, doc, updateDoc } from '@angular/fire/firestore';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-users',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.scss'
})
export class ListUsersComponent {
  usuarios: user[] = [];
  usuarioEnEdicion: user | null = null;

  email: any
  rol: any
  esAdministrador: boolean = false;

  constructor(private usuariosService: UserService) {
    
  }

  ngOnInit(): void {
    this.usuariosService.getUsuarios().subscribe(usuarios => {
      this.usuarios = usuarios;
    });
  }


  edit(usuario: user) {
    this.usuarioEnEdicion = usuario;
    this.email = usuario.email
  }

  onClickCargar(){
    if (!this.email) {
      alert('Por favor, primero seleccione al usuario.');

    } else {
      const valorEnviar = this.esAdministrador ? 'admin' : 'common';
      console.log('Enviando como:', valorEnviar);
      this.usuariosService.updateRole(this.email, valorEnviar)
    }
    console.log('email: ', this.email)
  }
}
