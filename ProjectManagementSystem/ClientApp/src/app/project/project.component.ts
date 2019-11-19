import {Component} from "@angular/core";
import {ProjectEditorService} from "../services/project-editor.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {MessageService} from "../services/message.service";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.less']
})
export class ProjectComponent {
  private componentsCanSave = [];
  canSave = false;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private projectEditor: ProjectEditorService,
              private messageService: MessageService){
    activatedRoute.params.subscribe(this.paramsDidChange.bind(this));
    this.componentsCanSave = activatedRoute.snapshot.data.canSave;
  }

  onActivate(component){
    this.canSave = this.componentsCanSave.some(c => component instanceof c);
  }
  private onSave(){
    if(!this.projectEditor.validate()){
      this.messageService.error('Failed to save','Some values are invalid and the project cannot be saved.');
      return;
    }

    const created = this.projectEditor.isNew();

    this.projectEditor.save().then(result => {
      if(created)
        this.router.navigate(['/project', this.projectEditor.currentProject.id, 'general']);
      this.messageService.success('Project saved', 'The project was successfully saved.');
    });
  }
  private paramsDidChange(params: Params){
    const id = params['id'];
    if(id){
      if(id == 0)
        this.projectEditor.clear();
      else
        this.projectEditor.loadProject(id);
    }else{
      this.router.navigate(['/home']);
    }
  }

}
