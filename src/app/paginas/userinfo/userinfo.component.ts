import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { user } from '../../domain/user';

@Component({
  selector: 'app-userinfo',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './userinfo.component.html',
  styleUrl: './userinfo.component.scss'
})
export class UserinfoComponent {
  displayName: any
  photoURL: any
  phone: any
  
  updateProfile(){

  }
}
