import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink} from '@angular/router';
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

  constructor(private userService: UserService, private router: Router){}

  loginWithGoogle(){
    this.userService.loginGoogle().
    then(response => {
      console.log(response)
      this.router.navigate(['inicio'])
    }).catch(error => console.log(error))
  }

  login(){
    this.userService.login(this.user.email, this.user.password).
    then(response => {
      console.log(response)
      this.router.navigate(['inicio'])
    }).catch(error => console.log(error))
  }
}
