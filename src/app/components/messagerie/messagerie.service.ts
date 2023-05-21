import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { Conversations } from 'src/app/models/conversations';
import { Messages } from 'src/app/models/messages';

@Injectable({
  providedIn: 'root'
})
export class MessagerieService {

  private socket = io('http://localhost:3000');
  // private socket = io('http://localhost:7777/socket');

  private urlapi = 'http://localhost:8800';
  // private urlapi = 'http://localhost:7777/messagerie';

  public message$: BehaviorSubject<string> = new BehaviorSubject('');
  messageList: any[] = [];

  constructor(private http: HttpClient) { }

  public sendMessage(senderId: number, receiver: number, message: string,conversatioId:number) {
    //  var receiverId = parseInt(receiver)
    console.log(senderId,receiver,message);
    this.socket.emit("sendMessage", { senderId, receiver, message });
    this.http.post(this.urlapi + '/api/messages', {conversationId: conversatioId,text: message}).subscribe(
      res => console.log(res)
    )
  }

  

  public getNewMessage = () => {
    this.socket.on("getMessage", (object) => {
      object["createdAt"]= new Date()
      const info={
        "sender":object.senderId,
        "message":object.message,
        "createdAt":object.createdAt,
      }
      this.messageList.push(info)
      return object.message;
    });
    return this.message$.asObservable();
  };

  public adduser(userid: number) {
    this.socket.emit("addUser", userid);
  }

  getMessages(model:any): Observable<Messages[]> {
    return this.http.get<Messages[]>(this.urlapi + '/api/messages/' + model)
  }

  getConversations(): Observable<Conversations[]> {
    return this.http.get<Conversations[]>(this.urlapi + '/api/conversations')
  }

  addConversation(model:any){
    this.http.post(this.urlapi+"/api/conversations",model).subscribe(
      res => console.log(res)
    )
  }

}

