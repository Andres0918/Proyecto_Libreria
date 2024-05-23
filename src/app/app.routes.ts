import { Routes } from '@angular/router';
import { LoginComponent } from './paginas/login/login.component';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { RegistroComponent } from './paginas/registro/registro.component';


export const routes: Routes = [
    {path: "", redirectTo: "inicio", pathMatch: "full"},
    { path:"login", component: LoginComponent },
    { path:"inicio", component: InicioComponent },
    {path: "registro", component: RegistroComponent}
];
