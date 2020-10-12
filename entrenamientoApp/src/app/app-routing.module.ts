import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//vistas 
import { RegistroUsuarioComponent } from './registro/registro-usuario.component';


const routes: Routes = [
  {path: 'usuarios/registro', component: RegistroUsuarioComponent},
  {path: '', redirectTo:'usuarios/registro', pathMatch: 'full'}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
