import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink} from '@angular/router';
import { UserService } from '../../services/user.service';
import { user } from '../../domain/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  user: user = new user()

  constructor(private userService: UserService){}

  loginWithGoogle(){
    this.userService.loginGoogle().
    then(response => {
      console.log(response)
    }).catch(error => console.log(error))
  }

  login(){
    this.userService.login(this.user.email, this.user.password).
    then(response => {
      console.log(response)
    }).catch(error => console.log(error))
  }
}
