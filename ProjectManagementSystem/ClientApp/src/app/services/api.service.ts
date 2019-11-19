import {Inject, Injectable} from "@angular/core";

@Injectable()
export class ApiService{

  constructor( @Inject('BASE_URL') private baseUrl: string){}

  getUrl(method: ApiMethod, parameters?: [{name: string, value: any}]): string{
    let url = this.baseUrl + 'api/';

    switch(method){
      case ApiMethod.GetAllProjects:
        url += 'Projects/GetAll';
        break;
      case ApiMethod.GetProjectById:
        url += 'Projects/GetById';
        break;
      case ApiMethod.SaveProject:
        url += 'Projects/Save';
        break;
      case ApiMethod.DeleteProject:
        url += 'Projects/Delete';
        break;
      case ApiMethod.GetAllUsers:
        url += 'Users/GetAll';
        break;
      case ApiMethod.GetUserById:
        url += 'Users/GetById';
        break;
      case ApiMethod.SaveUser:
        url += 'Users/Save';
        break;
      case ApiMethod.GetRequirements:
        url += 'Requirements/Get';
        break;
      case ApiMethod.GetRequirementsForProject:
        url += 'Requirements/GetForProject';
        break;
      case ApiMethod.GetEffortTypes:
        url += 'Efforts/GetTypes';
        break;
    }

    if(parameters){
      const parametersString = parameters.reduce((a, c) => {
        if(a != '')
          a += '&';

        a += c.name;
        a += '=';
        a += c.value;

        return a;
      }, '');

      url += '?' + parametersString;
    }

    return url;
  }

}

export enum ApiMethod {
  GetAllProjects,
  GetProjectById,
  GetAllUsers,
  GetUserById,
  SaveProject,
  DeleteProject,
  SaveUser,
  GetRequirements,
  GetRequirementsForProject,
  GetEffortTypes
}
