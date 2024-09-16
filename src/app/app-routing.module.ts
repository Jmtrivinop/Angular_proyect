import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PersonasComponent } from './pages/personas/personas.component';
import { AddEditPersonaComponent } from './components/add-edit-persona/add-edit-persona.component';
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'personas', component: PersonasComponent},
  { path: 'persona/:id', component: AddEditPersonaComponent},


  { path: '**', pathMatch: 'full', redirectTo: 'home' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
