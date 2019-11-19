import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from "@angular/core";
import {Effort, EffortFrequency} from "../../../models/effort.model";

@Component({
  selector: 'app-project-effort',
  templateUrl: './effort.component.html',
  styleUrls: ['./effort.component.less']
})
export class EffortComponent{
  @Input()efforts: Effort[];
  @Output()addEffort = new EventEmitter();

  private effortFrequency = EffortFrequency;

  private onRemoveEffort(effort: Effort){
    const index = this.efforts.indexOf(effort);
    if(index >= 0)
      this.efforts.splice(index, 1);
  }
}
