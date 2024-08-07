import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { RouterLink } from '@angular/router';
import { onAuthStateChanged } from 'firebase/auth';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  role: string | null = null;

  constructor(private auth: Auth, private userServices: UserService){}

  ngOnInit() {
    const loggetOutLink = document.getElementById('logout');
    const loggetInLink = document.getElementById('login');
    const adminLink = document.getElementById('admin');
    const commonLink = document.getElementById('common');
    const adminLink2 = document.getElementById('admin2');
    const adminLink3 = document.querySelectorAll<HTMLElement>('#admin3');

    onAuthStateChanged(this.auth, async (user) => {
      console.log('usuario xd: ',user)
      if(user && user.email){
         this.userServices.getRoleByEmail(user.email).subscribe(
          role => {
            this.role = role
            console.log('Rol: ', this.role);
            if (adminLink && commonLink && adminLink2 && adminLink3) {
              if (role === 'admin') {
                adminLink.style.display = 'block';
                adminLink2.style.display = 'block';
                commonLink.style.display = 'none';
                adminLink3.forEach((link) => {
                  link.style.display = 'block';
                });
              } else {
                adminLink.style.display = 'none';
                adminLink2.style.display = 'none';
                commonLink.style.display = 'block';
                adminLink3.forEach((link) => {
                  link.style.display = 'none';
                });
              }
            }
          },
          error => {
            console.error('Error fetching role', error);
            this.role = null;
            if (adminLink && commonLink && adminLink2) {
              adminLink.style.display = 'none';
              adminLink2.style.display = 'none';
              commonLink.style.display = 'block';
            }
          }
        );
      } else {
        if (adminLink && commonLink && adminLink2) {
          adminLink.style.display = 'none';
          adminLink2.style.display = 'none';
          commonLink.style.display = 'block';
        }
      }
      
      if (user) {
        if (loggetInLink && loggetOutLink) {
          loggetInLink.style.display = 'none';
          loggetOutLink.style.display = 'block';
        }
      } else {
        if (loggetInLink && loggetOutLink) {
          loggetOutLink.style.display = 'none';
          loggetInLink.style.display = 'block';
        }
      }      
    }, error => {
      console.log('Error en el auth: ', error);
    });
  }
}
