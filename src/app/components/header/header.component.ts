import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { RouterLink } from '@angular/router';
import { onAuthStateChanged } from 'firebase/auth';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(private auth: Auth){}

  ngOnInit(){
    const loggetOutLink = document.getElementById('logout')
    const loggetInLink = document.getElementById('login')

    onAuthStateChanged(this.auth, async (user) => {
      console.log('usuario: ',user)

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
