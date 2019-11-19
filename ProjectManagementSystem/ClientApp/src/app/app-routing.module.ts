import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {ProjectComponent} from "./project/project.component";
import {GeneralComponent} from "./project/general/general.component";
import {RequirementsComponent} from "./project/requirements/requirements.component";
import {DashboardComponent} from "./project/dashboard/dashboard.component";

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'project/:id', component: ProjectComponent, children: [
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'general', component: GeneralComponent},
      {path: 'requirements', component: RequirementsComponent}
    ], data: {canSave: [GeneralComponent, RequirementsComponent]}},
  {path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{}
