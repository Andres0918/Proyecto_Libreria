import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { user } from '../../domain/user';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { onAuthStateChanged } from 'firebase/auth';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';

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
  
  constructor(private userService: UserService, private authService: AuthService, private auth:Auth, private router: Router){}

  updateProfile(){
    this.userService.updateProfile(this.auth.currentUser, this.displayName, this.photoURL).
    then(response => {
      console.log(this.auth.currentUser)
      alert('Modificacion exitosa')
      this.router.navigate(['cuenta'])
    })
    
  }
}
