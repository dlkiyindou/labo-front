import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PersonsComponent} from './persons/persons.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {PersonDetailComponent} from './person-detail/person-detail.component';

const routes: Routes = [
  {path: 'persons', component: PersonsComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'person/:id', component: PersonDetailComponent},
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
