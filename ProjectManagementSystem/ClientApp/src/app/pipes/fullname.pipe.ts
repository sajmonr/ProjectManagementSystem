import {Pipe, PipeTransform} from "@angular/core";
import {User} from "../models/user.model";

@Pipe({
  name: 'fullname'
})
export class FullNamePipe implements PipeTransform{
  transform(user: User): any {
    return user.firstName && user.lastName ? user.firstName + ' ' + user.lastName : 'NO USER DATA';
  }
}
