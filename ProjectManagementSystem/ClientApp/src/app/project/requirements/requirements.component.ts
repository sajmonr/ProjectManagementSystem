import {Component, ElementRef, ViewChild} from "@angular/core";
import {ProjectEditorService} from "../../services/project-editor.service";
import {Requirement, RequirementType} from "../../models/requirement.model";
import {StringExtensions} from "../../shared/extensions/StringExtensions";
import {NgForm} from "@angular/forms";
import {Effort} from "../../models/effort.model";
import {EffortType} from "../../models/effort-type.model";
import {EffortService} from "../../services/effort.service";

declare var $: any;

@Component({
  selector: 'app-requirements',
  templateUrl: './requirements.component.html',
  styleUrls: ['./requirements.component.less']
})
export class RequirementsComponent{
  @ViewChild('editRequirementModal')editRequirementModal: ElementRef;
  @ViewChild('editForm')editForm: NgForm;
  @ViewChild('addEffortForm')addEffortForm: NgForm;
  requirementType = RequirementType;
  effortTypes: EffortType[] = [];
  requirementToEdit = new Requirement();

  constructor(public projectEditor: ProjectEditorService,
              private effortService: EffortService){
    this.sortRequirements(this.projectEditor.currentProject.requirements);
    this.effortService.getEffortTypes().then(types => this.effortTypes = types);
  }
  private onCreateEdit(requirement?: Requirement, event?){
    if(event){
      event.stopPropagation();
      $('#new-requirement-modal').modal('show');
    }

    if(!requirement)
      requirement = this.createNewRequirement();

    this.requirementToEdit = requirement;
  }

  onRequirementUpdate(){
    if(this.requirementToEdit.type >= 0 && !StringExtensions.isNullOrEmpty(this.requirementToEdit.description)){
      const index = this.projectEditor.currentProject.requirements.findIndex(r => r.id == this.requirementToEdit.id);

      if(index >= 0)
        this.projectEditor.currentProject.requirements[index] = this.requirementToEdit;
      else
        this.projectEditor.currentProject.requirements.push(this.requirementToEdit);

      this.onCreateEdit();
      $(this.editRequirementModal.nativeElement).modal('hide');
      this.editForm.resetForm();
    }
  }
  private onEffortEdit(requirement: Requirement){
    this.requirementToEdit = requirement;
  }
  onEffortAdd(){
    const effort = new Effort();

    effort.id = this.randomNewId();
    effort.requirementId = this.requirementToEdit.id;
    effort.hours = this.addEffortForm.value.hours;
    effort.added = new Date(this.addEffortForm.value.date);
    effort.frequency = +this.addEffortForm.value.period;
    effort.type = this.addEffortForm.value.type;

   this.requirementToEdit.efforts.push(effort);
  }

  trackByRequirements(index, item){
    return index;
  }
  sortRequirements(requirements: Requirement[]): {type: RequirementType, requirements: Requirement[]}[]{
    return [
      {type: RequirementType.Functional, requirements: requirements.filter(r => r.type == RequirementType.Functional)},
      {type: RequirementType.NonFunctional, requirements: requirements.filter(r => r.type == RequirementType.NonFunctional)}
      ];
  }

  private randomNewId(): number{
    return Math.round(Math.random() * -10000);
  }

  private createNewRequirement(): Requirement{
    const requirement = new Requirement();

    let newId = this.randomNewId();
    while(this.projectEditor.currentProject.requirements.some(r => r.id == newId)){
      newId = this.randomNewId();
    }

    requirement.projectId = this.projectEditor.currentProject.id;
    requirement.id = newId;
    requirement.type = RequirementType.Functional;

    return requirement;
  }

}
