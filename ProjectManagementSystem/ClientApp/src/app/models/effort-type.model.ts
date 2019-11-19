export class EffortType{
  id: number;
  name: string;

  constructor(json?: EffortType){
    this.id = -1;

    if(json) {
      this.id = json.id;
      this.name = json.name;
    }
  }

}
