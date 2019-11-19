import {User} from "./user.model";
import {Requirement} from "./requirement.model";

export class Project{
  id: number;
  title: string;
  description: string;
  created: Date;
  manager: User;
  teamMembers: User[];
  requirements: Requirement[];

  constructor(project?: Project){
    this.id = -1;
    this.teamMembers = [];
    this.requirements = [];

    if(project){
      this.id = project.id;
      this.title = project.title;
      this.description = project.description;
      this.created = new Date(project.created);
      this.manager = new User(project.manager);

      project.teamMembers.forEach(m => this.teamMembers.push(new User(m)));
      project.requirements.forEach(r => this.requirements.push(new Requirement(r)));
    }
  }

}
