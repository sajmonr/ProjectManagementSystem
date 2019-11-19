import {EventEmitter, Injectable, Output} from "@angular/core";
import {Message, MessageType} from "../models/message.model";
import {ApiMethod, ApiService} from "./api.service";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class MessageService{
  @Output()messageReceived = new EventEmitter<Message>();

  constructor(private httpClient: HttpClient,
              private apiService: ApiService){}

  info(title: string, message: string){
    this.messageReceived.emit(this.constructMessage(title, message, MessageType.Info));
  }
  error(title: string, message: string){
    this.messageReceived.emit(this.constructMessage(title, message, MessageType.Error));
  }
  success(title: string, message: string){
    this.messageReceived.emit(this.constructMessage(title, message, MessageType.Success));
  }

  private constructMessage(title: string, message: string, type: MessageType): Message {
    const msg = new Message();

    msg.title = title;
    msg.modalMessage = message;
    msg.type = type;

    return msg;
  }
}
