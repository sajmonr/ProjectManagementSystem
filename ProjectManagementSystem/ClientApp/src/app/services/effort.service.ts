import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {EffortType} from "../models/effort-type.model";
import {ApiMethod, ApiService} from "./api.service";
import {Effort} from "../models/effort.model";

@Injectable()
export class EffortService {

  constructor(private http: HttpClient, private api: ApiService) {
  }

  getEffortTypes(): Promise<EffortType[]> {
    return new Promise<EffortType[]>(resolve => {
      this.http.get<EffortType[]>(this.api.getUrl(ApiMethod.GetEffortTypes)).subscribe(efforts => {
        resolve(efforts.map(et => new EffortType(et)));
      })
    });
  }
}
