import {Injectable} from "@angular/core";
import {ApiMethod, ApiService} from "./api.service";
import {User} from "../models/user.model";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class UsersService{
  constructor(private api: ApiService, private http: HttpClient){}

  getUsers(): Promise<User[]>{
    return new Promise<User[]>(resolve => {
      this.http.get<User[]>(this.api.getUrl(ApiMethod.GetAllUsers)).subscribe(result => {
        if(result){
          const users: User[] = [];

          result.forEach(u => {
            users.push(new User(u));
          });

          resolve(users);
        }else{
          resolve([]);
        }
      });
    })
  }
  save(user: User): Promise<User>{
    return new Promise<User>(resolve => {
      this.http.post<User>(this.api.getUrl(ApiMethod.SaveUser), user).subscribe(result => resolve(new User(result)));
    });
  }
}
