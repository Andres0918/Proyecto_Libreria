import { Routes } from '@angular/router';
import { LoginComponent } from './paginas/login/login.component';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { HistoriaComponent } from './paginas/historia/historia.component';
import { BibliotecaComponent } from './paginas/biblioteca/biblioteca.component';
import { GenerosComponent } from './paginas/generos/generos.component';


export const routes: Routes = [
    { path:"login", component: LoginComponent },
    { path:"inicio", component: InicioComponent },
    { path:"historia", component: HistoriaComponent },
    { path:"biblioteca", component: BibliotecaComponent},
];
