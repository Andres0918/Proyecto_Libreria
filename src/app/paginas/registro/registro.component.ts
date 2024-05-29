import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { user } from '../../domain/user';
import { Router, RouterLink } from '@angular/router';
import { updateProfile } from 'firebase/auth';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent {

  user: user = new user()
  cpassword: any

  userF: any

  constructor(private userService: UserService, private router: Router, private authService: AuthService){}

  validarPassword(): boolean{
    if(this.user.email === undefined && this.user.password === undefined && this.cpassword === undefined){
      return false
    }else{
      return this.user.password === this.cpassword
    }
  }

  register(){
    if(this.validarPassword()){

      this.userService.register(this.user.email, this.user.password).
      then(response => {

        console.log(response)
        this.userF = response.user
        console.log('usuario: ',this.userF)
        this.authService.setUser(this.userF)
        console.log('Usuario en service: ', this.authService.getUser())
        this.router.navigate(['userinfo'])

      }).catch(error => {
        console.log(error)
        if(error.code === 'auth/email-already-in-use'){
          alert('El correo ya esta en uso')
          this.router.navigate(['login'])
        }
        if(error.code === 'auth/missing-password'){
          alert('Ingrese una contraseña')
        }
        if(error.code === 'auth/invalid-email'){
          alert('El email ingresado no es valido')
        }
      })
    }
  }

  loginGoogle(){
    this.userService.loginGoogle().
    then(response => {
      console.log(response)
      const user = response.user
      console.log('usuario: ',user)
      this.router.navigate(['inicio'])
    }).catch(error => {
      console.log(error.code)
    })
  }


}
