import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { onAuthStateChanged } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-cuenta',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cuenta.component.html',
  styleUrl: './cuenta.component.scss'
})
export class CuentaComponent {

  constructor(private auth: Auth, 
    private userService: UserService, 
    private router: Router){}

  displayName= this.auth.currentUser?.displayName
  email= this.auth.currentUser?.email 
  photoURL = this.auth.currentUser?.photoURL
  
  ngOnInit(){
    onAuthStateChanged(this.auth, async (user) => {
      console.log(user?.photoURL)
      if(user){
        this.displayName=user.displayName
        this.email=user.email
        this.photoURL=user.photoURL
        if(user.photoURL === null){
          this.photoURL = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
        }
      }
    })
  }

  logout(){
    this.userService.logOut().
    then(response => {
      this.router.navigate(['inicio'])
      alert('Se cerro correctamente la sesion')
    })
    
  }
}
