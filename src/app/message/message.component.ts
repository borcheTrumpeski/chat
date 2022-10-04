import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
})
export class MessageComponent implements OnInit {

  @Input() userID: number | undefined;

  messages: any[] = [];

  form: FormGroup;

  constructor(fb: FormBuilder, private messageService: MessageService) {
    this.form = fb.group({
      message: [''],
    });
  }
  ngOnInit(): void {
    this.messageService.msgObservable$.subscribe((msg) => {
      this.messages.push(msg);
    });
  }
  displayMessages() {
    const msgs = {
      message: this.form.get('message')?.value,
      userID: this.userID,
    };
    this.messageService.sendMessage(msgs);
    this.form.reset();
  }
}
