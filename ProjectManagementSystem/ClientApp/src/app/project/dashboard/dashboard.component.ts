import {Component, OnInit} from "@angular/core";
import {ProjectEditorService} from "../../services/project-editor.service";
import {EffortService} from "../../services/effort.service";
import {EffortType} from "../../models/effort-type.model";

@Component({
  selector: 'app-project-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit{
  effortTypes: EffortType[] = [];

  constructor(private projectEditor: ProjectEditorService, private effortService: EffortService){}

  ngOnInit(): void {
    this.effortService.getEffortTypes().then(types => this.effortTypes = types);
  }

  getHoursForType(effortType?: EffortType): number{
    return effortType
    ? this.projectEditor.currentProject.requirements.reduce((requirementAccumulator, currentRequirement) =>
      requirementAccumulator + currentRequirement.efforts.filter(e => e.type.id == effortType.id).reduce((a, c) => a + c.hours, 0), 0)
    : this.projectEditor.currentProject.requirements.reduce((requirementAccumulator, currentRequirement) =>
      requirementAccumulator + currentRequirement.efforts.reduce((a, c) => a + c.hours, 0), 0);
  }
}
