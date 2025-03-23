import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Message } from '../Message';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-messages',
  imports: [
    MatIconModule,
    MatTableModule,
  ],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss'
})
export class MessagesComponent implements OnInit {
  private sessionService = inject(SessionService);

  dataSource: Message[] = [];
  displayedColumns: string[] = ['date', 'from', 'subject', 'actions'];

  markMessageAsRead(messageId: number): void {
    this.sessionService.markMessageAsRead(messageId);
  }

  ngOnInit(): void {
    this.sessionService.getMessages().subscribe(messages => this.dataSource = messages.map(message => ({ message, date: new Date(message.date) })).sort((a, b) => b.date.getTime() - a.date.getTime()).map(messageAndDate => messageAndDate.message));
  }
}
