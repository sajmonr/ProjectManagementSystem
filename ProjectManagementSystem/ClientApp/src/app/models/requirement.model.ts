import {Effort} from "./effort.model";

export class Requirement{
  id: number;
  projectId: number;
  type: RequirementType;
  description: string;
  created: Date;
  efforts: Effort[];

  constructor(requirement?: Requirement){
    this.id = -1;
    this.type = RequirementType.NonFunctional;
    this.created = new Date();
    this.efforts = [];

    if(requirement) {
      this.id = requirement.id;
      this.projectId = requirement.projectId;
      this.type = requirement.type;
      this.description = requirement.description;
      this.created = new Date(requirement.created);
      requirement.efforts.forEach(e => this.efforts.push(new Effort(e)));
    }
  }

}

export enum RequirementType{
  NonFunctional,
  Functional
}
