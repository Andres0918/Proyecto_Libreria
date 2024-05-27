import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { user } from '../../domain/user';
import { Router, RouterLink } from '@angular/router';

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

  constructor(private userService: UserService, private router: Router){}

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
        this.router.navigate(['login'])
      }).catch(error => console.log(error))
      
    }
  }

  loginGoogle(){
    this.userService.loginGoogle().
    then(response => {
      console.log(response)
    }).catch(error => console.log(error))
    
  }
}
