import {EventEmitter, Injectable, Output} from "@angular/core";
import {ProjectsService} from "./projects.service";
import {Project} from "../models/project.model";

@Injectable()
export class ProjectEditorService{
  @Output()projectLoaded = new EventEmitter<Project>();

  currentProject = new Project();

  constructor(private projectService: ProjectsService){}

  loadProject(projectId: number){
    this.projectService.getProject(projectId).then(project => {
      if(project){
        this.currentProject = project;
        this.projectDidLoad();
      }
    });
  }

  clear(){
    this.currentProject = new Project();
    this.projectDidLoad();
  }

  save(): Promise<Project>{
    return new Promise<Project>(resolve => {
      this.projectService.saveProject(this.currentProject).then(newProject => {
        this.currentProject = newProject;
        this.projectDidLoad();
        resolve(newProject);
      })
    });
  }

  validate(): boolean{
    return this.currentProject && this.currentProject.title && this.currentProject.description && this.currentProject.manager != null;
  }
  isNew(): boolean{
    return this.currentProject.id <= 0;
  }
  private projectDidLoad(){
    this.projectLoaded.emit(this.currentProject);
  }

}
