import { Routes } from '@angular/router';
import { LoginComponent } from './paginas/login/login.component';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { RegistroComponent } from './paginas/registro/registro.component';
import { HistoriaComponent } from './paginas/historia/historia.component';
import { BibliotecaComponent } from './paginas/biblioteca/biblioteca.component';
import { GenerosComponent } from './paginas/generos/generos.component';
import { UserinfoComponent } from './paginas/userinfo/userinfo.component';
import { MisionComponent } from './paginas/mision/mision.component';
import { VisionComponent } from './paginas/vision/vision.component';



export const routes: Routes = [
    {path: "", redirectTo: "inicio", pathMatch: "full"},
    { path:"login", component: LoginComponent },
    { path:"inicio", component: InicioComponent },
    { path:"registro", component: RegistroComponent},
    { path:"historia", component: HistoriaComponent },
    { path:"mision", component: MisionComponent },
    { path:"vision", component: VisionComponent },
    { path:"biblioteca", component: BibliotecaComponent},
    { path:"userinfo", component: UserinfoComponent}
];
