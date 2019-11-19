import {Component, OnInit} from '@angular/core';
import {Project} from "../models/project.model";
import {Router} from "@angular/router";
import {ProjectsService} from "../services/projects.service";
import {ProjectEditorService} from "../services/project-editor.service";
import {MessageService} from "../services/message.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit{
  projects: Project[] = [];

  constructor(private projectsService: ProjectsService,
              private projectEditor: ProjectEditorService,
              private router: Router,
              private messageService: MessageService){}

  ngOnInit(): void {
    this.projectEditor.clear();
    this.loadProjects();
  }

  onProjectSelect(projectId: number){
    const commands = ['/project', projectId];
    if(projectId <= 0)
      commands.push('general');

    this.router.navigate(commands);
  }

  private async onProjectDelete(project: Project, event?){
    if(event){
      event.stopPropagation();
    }

    await this.projectsService.delete(project);
    this.messageService.success('Delete successful', 'The project was successfully deleted.');
    this.loadProjects();
  }

  private loadProjects(){
    this.projectsService.getProjects().then(projects => {
      this.projects = projects;
    });
  }

}
