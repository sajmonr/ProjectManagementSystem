import {EffortType} from "./effort-type.model";

export class Effort{
  id: number;
  requirementId: number;
  type: EffortType;
  frequency: EffortFrequency;
  hours: number;
  added: Date;

  constructor(json?: Effort){
    this.id = -1;
    this.requirementId = -1;
    this.type = new EffortType();
    this.frequency = EffortFrequency.Daily;
    this.added = new Date();

    if(json){
      this.id = json.id;
      this.requirementId = json.requirementId;
      this.type = new EffortType(json.type);
      this.frequency = json.frequency;
      this.hours = json.hours;
      this.added = new Date(json.added);
    }
  }

}

export enum EffortFrequency{
  Daily,
  Weekly
}
