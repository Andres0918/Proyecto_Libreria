import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { user } from '../../domain/user';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent {

  user: user = new user()
  cpassword: any

  constructor(private userService: UserService){}

  validarPassword(): boolean{
    return this.user.password === this.cpassword
  }

  onSubmit(){
    if(this.validarPassword()){
      this.userService.register(this.user.email, this.user.password).
      then(response => {
        console.log(response)
      }).catch(error => console.log(error))
    }
  }


}
