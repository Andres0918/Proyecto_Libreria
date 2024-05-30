import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cuenta',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cuenta.component.html',
  styleUrl: './cuenta.component.scss'
})
export class CuentaComponent {

  constructor(private auth: Auth){}

  displayName= this.auth.currentUser?.displayName
  email= this.auth.currentUser?.email 
  photoURL = this.auth.currentUser?.photoURL

  logout(){

  }
}
