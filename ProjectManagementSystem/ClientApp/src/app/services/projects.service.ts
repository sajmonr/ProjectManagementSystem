import {Injectable} from "@angular/core";
import {ApiMethod, ApiService} from "./api.service";
import {HttpClient} from "@angular/common/http";
import {Project} from "../models/project.model";
import {Observable} from "rxjs";

@Injectable()
export class ProjectsService{
  constructor(private api: ApiService, private http: HttpClient){}

  saveProject(project: Project): Promise<Project>{
    return new Promise<Project>(resolve => {
      this.http.post<Project>(this.api.getUrl(ApiMethod.SaveProject), project).subscribe(result => resolve(new Project(result)));
    })
  }
  getProject(id: number): Promise<Project>{
    return new Promise<Project>(resolve => {
      this.getProjectsFromApi().subscribe((result: Project[]) => {
        const project = result.filter(p => p.id == id);

        if(project && project.length === 1){
          resolve(new Project(project[0]));
        }else{
          resolve(null);
        }
      });
    });
  }
  getProjects(): Promise<Project[]>{
    return new Promise<Project[]>(resolve => {
      this.getProjectsFromApi().subscribe(result => {
        if(result){
          const projects: Project[] = [];

          result.forEach(p => projects.push(new Project(p)));

          resolve(projects);
        }else{
          resolve([]);
        }
      });
    });
  }

  delete(project: Project): Promise<any>{
    return new Promise<any>(resolve => {
      this.http.get(this.api.getUrl(ApiMethod.DeleteProject, [{name: 'projectId', value: project.id}])).subscribe(result => resolve());
    });
  }

  private getProjectsFromApi(): Observable<Project[]>{
    return this.http.get<Project[]>(this.api.getUrl(ApiMethod.GetAllProjects));
  }

}
