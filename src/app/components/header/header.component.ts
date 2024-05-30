import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { RouterLink } from '@angular/router';
import { onAuthStateChanged } from 'firebase/auth';
import { UserService } from '../../services/user.service';
import { of, Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  role: string | null = null;


  constructor(private auth: Auth, private userServices: UserService){}

  ngOnInit(){
    const loggetOutLink = document.getElementById('logout')
    const loggetInLink = document.getElementById('login')
    const adminLink = document.getElementById('admin')
    const commonLink = document.getElementById('common')

    onAuthStateChanged(this.auth, async (user) => {
      console.log('usuario: ',user)

      this.userServices.getRoleByEmail(this.auth.currentUser?.email).subscribe(
        role => {
          console.log('Rol: ', role)

          if(adminLink && commonLink){
            if(role === 'admin'){
              adminLink.style.display='block'
              commonLink.style.display='none'
            }else{
              adminLink.style.display='none'
              commonLink.style.display='block'
            }
          }
        },
        error => {
          console.error('Error fetching role', error);
          this.role = null; // Manejo de error
        }
      );
      
      if(user){
        if(loggetInLink && loggetOutLink){
          loggetInLink.style.display = 'none'
          loggetOutLink.style.display = 'block'
        }
      }else{
        if(loggetInLink && loggetOutLink){
          loggetOutLink.style.display = 'none'
          loggetInLink.style.display = 'block'
        }
      }

      
    })
  }
}
