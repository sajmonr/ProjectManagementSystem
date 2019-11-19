import {Injectable} from "@angular/core";
import {Requirement} from "../models/requirement.model";
import {HttpClient} from "@angular/common/http";
import {ApiMethod, ApiService} from "./api.service";

@Injectable()
export class RequirementsService{

  constructor(private http: HttpClient, private api: ApiService){}

  get(projectId?: number): Promise<Requirement[]>{
    return new Promise<Requirement[]>(resolve => {
      const url = this.api.getUrl(projectId ? ApiMethod.GetRequirementsForProject : ApiMethod.GetRequirements, projectId ? [{name: 'projectId', value: projectId}] : null);
      this.http.get<Requirement[]>(url).subscribe(result => resolve(result.map(r => new Requirement(r))));
    });
  }

}
