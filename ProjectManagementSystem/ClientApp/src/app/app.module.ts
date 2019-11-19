import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import {AppRoutingModule} from "./app-routing.module";
import {ApiService} from "./services/api.service";
import {ProjectComponent} from "./project/project.component";
import {FullNamePipe} from "./pipes/fullname.pipe";
import {RequirementsComponent} from "./project/requirements/requirements.component";
import {GeneralComponent} from "./project/general/general.component";
import {UsersService} from "./services/users.service";
import {ProjectsService} from "./services/projects.service";
import {EffortComponent} from "./project/requirements/efforts/effort.component";
import {MessageService} from "./services/message.service";
import {MessageComponent} from "./shared/components/message/message.component";
import {RequirementsService} from "./services/requirements.service";
import {ProjectEditorService} from "./services/project-editor.service";
import {WeekRangePipe} from "./pipes/week-range.pipe";
import {EffortService} from "./services/effort.service";
import {DashboardComponent} from "./project/dashboard/dashboard.component";

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    ProjectComponent,
    FullNamePipe,
    WeekRangePipe,
    GeneralComponent,
    RequirementsComponent,
    EffortComponent,
    MessageComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [HttpClient, ApiService, UsersService, ProjectsService, MessageService, RequirementsService, ProjectEditorService, EffortService],
  bootstrap: [AppComponent]
})
export class AppModule { }
