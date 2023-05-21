import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessagerieService } from './messagerie.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Conversations } from 'src/app/models/conversations';
import { Messages } from 'src/app/models/messages';
import { tap } from 'rxjs';

@Component({
  selector: 'app-messagerie',
  templateUrl: './messagerie.component.html',
  styleUrls: ['./messagerie.component.css']
})
export class MessagerieComponent implements OnInit {

  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;

  searchTerm: string | undefined;
  term: string | undefined;
  conversations: Conversations[] = [];
  messages: Messages[] = [];
  senderId!: number;
  receiverId!: number;
  conversationId!: number;
  user: any;

  constructor(
    private messagerieService: MessagerieService, 
    private authService: AuthService, 
    private ref: ChangeDetectorRef
  ) {
    this.authService.getUserInfo().pipe(
      tap(user => this.senderId = user.id)
    ).subscribe();
  }

  ngOnInit() {
    this.messagerieService.getConversations().pipe(
      tap(conversations => this.conversations = conversations)
    ).subscribe();
  }

  openConversation(username: string, conversationId: number, receiverId: number) {
    // guardUserId(receiverId);
    this.user = username;
    this.receiverId = receiverId;
    this.conversationId = conversationId;
    this.getMessages(conversationId);
  }

  getMessages(conversationId: number) {
    this.messagerieService.getMessages(conversationId).pipe(
      tap(messages => this.messages = messages)
    ).subscribe();

     //Tri des messages une seule fois en mémoire
     this.messages.sort(function (a, b) {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }).reverse();
  }

  onSubmit(form: NgForm) {
    // guardMessage(form.value.text);
    this.messagerieService.sendMessage(this.senderId, this.receiverId, form.value.text, this.conversationId);
    form.reset();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }



}



