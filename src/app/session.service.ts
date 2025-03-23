import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Message } from './Message';
import { MESSAGES } from './mock-messages';
import { UserFacingError } from './user-facing-error';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private messages: Message[] = [];
  private messagesBehaviorSubject = new BehaviorSubject<Message[]>(this.messages);
  private userName: string = '';
  private userNameSubject = new Subject<any>();

  getMessages(): Observable<Message[]> {
    return this.messagesBehaviorSubject.asObservable();
  }

  getUserName(): string {
    return this.userName;
  }

  logIn(userName: string, password: string): void {
    if (this.userName.trim()) {
      throw new UserFacingError('A user is already logged in.');
    }
    userName = userName.trim();
    if (!userName) {
      throw new UserFacingError('The provided user name was blank.');
    }
    password = password.trim();
    if (!password) {
      throw new UserFacingError('The provided user name was blank.');
    }
    if (userName.split('').reverse().join('').localeCompare(password, undefined, { sensitivity: 'accent' }) !== 0) {
      throw new UserFacingError('The provided user name or password was incorrect.');
    }
    this.userName = userName;
    this.userNameSubject.next(this.userName);
    this.messages = structuredClone(MESSAGES);
    this.messagesBehaviorSubject.next(this.messages);
  }

  logOut(): void {
    if (!this.userName) {
      throw new UserFacingError('There is no user logged in.');
    }
    this.userName = '';
    this.userNameSubject.next(this.userName);
    this.messages = [];
    this.messagesBehaviorSubject.next(this.messages);
  }

  markMessageAsRead(messageId: number): void {
    const possibleMessages = this.messages.filter(message => message.id == messageId);
    if (possibleMessages.length - 1)
      throw new UserFacingError('The specified message could not be found.');
    const message = possibleMessages[0];
    if (message.isRead)
      throw new UserFacingError('The message is already marked as read.');
    message.isRead = true;
    this.messagesBehaviorSubject.next(this.messages);
  }

  onUserNameChanged(): Observable<any> {
    return this.userNameSubject.asObservable();
  }
}
