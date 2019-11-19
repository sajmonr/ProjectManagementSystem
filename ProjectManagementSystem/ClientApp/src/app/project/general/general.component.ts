import {Component, OnInit, ViewChild} from "@angular/core";
import {NgForm} from "@angular/forms";
import {UsersService} from "../../services/users.service";
import {User} from "../../models/user.model";
import {MessageService} from "../../services/message.service";
import {ProjectEditorService} from "../../services/project-editor.service";
import {StringExtensions} from "../../shared/extensions/StringExtensions";

@Component({
  selector: 'app-project-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.less']
})
export class GeneralComponent implements OnInit{
  @ViewChild('addMemberForm')addMemberForm: NgForm;
  users: User[] = [];

  constructor(private usersService: UsersService,
              private message: MessageService,
              public projectEditor: ProjectEditorService){}

  ngOnInit(): void {
    this.usersService.getUsers().then(result => this.users = result.map(u => new User(u)));
  }

  async onAddMember(){
    if(!this.addMemberForm.value.member && (StringExtensions.isNullOrEmpty(this.addMemberForm.value.firstName) || StringExtensions.isNullOrEmpty(this.addMemberForm.value.lastName))){
      this.message.error('Failed', 'A new member of the team could not be added.');
      return;
    }

    if(!StringExtensions.isNullOrEmpty(this.addMemberForm.value.firstName) && !StringExtensions.isNullOrEmpty(this.addMemberForm.value.lastName)){
      const user = new User();

      user.firstName = this.addMemberForm.value.firstName;
      user.lastName = this.addMemberForm.value.lastName;

      const createdUser = await this.usersService.save(user);

      if(createdUser.id > 0){
        this.addUserToProject(createdUser);
      }else{
        this.message.error('Error', 'Failed to create user in the database.');
        return;
      }
    }else{
      this.addUserToProject(this.addMemberForm.value.member);
    }

    this.addMemberForm.reset();
  }

  private onRemoveMember(member: User){
    const index = this.projectEditor.currentProject.teamMembers.indexOf(member);
    if(index >= 0)
      this.projectEditor.currentProject.teamMembers.splice(index, 1);
  }

  userListComparator(left: User, right: User): boolean{
    if(!left || !right) return false;

    return left.id == right.id;
  }

  getAvailableMembers(currentUsers: User[]): User[]{
    return this.users.filter(u => !currentUsers.some(cu => cu.id == u.id));
  }

  private addUserToProject(user: User){
    if(!this.projectEditor.currentProject.teamMembers.some(u => u.id == user.id))
      this.projectEditor.currentProject.teamMembers.push(user);
  }
}
