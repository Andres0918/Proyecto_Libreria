import { Routes } from '@angular/router';
import { LoginComponent } from './paginas/login/login.component';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { RegistroComponent } from './paginas/registro/registro.component';
import { HistoriaComponent } from './paginas/historia/historia.component';
import { BibliotecaComponent } from './paginas/biblioteca/biblioteca.component';
import { UserinfoComponent } from './paginas/userinfo/userinfo.component';
import { MisionComponent } from './paginas/mision/mision.component';
import { VisionComponent } from './paginas/vision/vision.component';
import { CatalogoComponent } from './paginas/catalogo/catalogo.component';
import { CuentaComponent } from './paginas/cuenta/cuenta.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard'
import { AuthGuard } from './auth.guard';
import { ListUsersComponent } from './paginas/list-users/list-users.component';



export const routes: Routes = [
    {path: "", redirectTo: "inicio", pathMatch: "full"},
    { path:"login", component: LoginComponent },
    { path:"inicio", component: InicioComponent },
    { path:"registro", component: RegistroComponent},
    { path:"historia", component: HistoriaComponent },
    { path:"biblioteca", component: BibliotecaComponent, canActivate: [AuthGuard]},
    { path:"userinfo", component: UserinfoComponent, ...canActivate(()=> redirectUnauthorizedTo(['login'])) },
    { path:"cuenta", component: CuentaComponent, ...canActivate(()=> redirectUnauthorizedTo(['login'])) },
    { path:"mision", component: MisionComponent },
    { path:"vision", component: VisionComponent },
    { path:"catalogo", component: CatalogoComponent},
    { path:"usuarios", component: ListUsersComponent, canActivate: [AuthGuard]}
];
