import { Routes } from '@angular/router';
import { LoginComponent } from './paginas/login/login.component';
import { InicioComponent } from './paginas/inicio/inicio.component';


export const routes: Routes = [
    { path:"login", component: LoginComponent },
    { path:"inicio", component: InicioComponent }
];
