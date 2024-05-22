import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { LoginComponent } from './paginas/login/login.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, HeaderComponent, LoginComponent]
})
export class AppComponent {
  title = 'ProyectoBiblioteca';
}
