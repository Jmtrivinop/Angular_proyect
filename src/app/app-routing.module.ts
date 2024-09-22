import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PersonasComponent } from './pages/personas/personas.component';
import { AddEditPersonaComponent } from './components/add-edit-persona/add-edit-persona.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { AddEditUsuarioComponent } from './components/add-edit-usuario/add-edit-usuario.component';
import { CiudadComponent } from './pages/ciudad/ciudad.component';
import { AddEditCiudadComponent } from './components/add-edit-ciudad/add-edit-ciudad.component';
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'personas', component: PersonasComponent},
  { path: 'persona/:id', component: AddEditPersonaComponent},
  { path: 'usuario', component: UsuarioComponent},
  { path: 'user/:id', component: AddEditUsuarioComponent},
  { path: 'ciudad', component: CiudadComponent},
  { path: 'ciudad/:id', component: AddEditCiudadComponent},


  { path: '**', pathMatch: 'full', redirectTo: 'home' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
