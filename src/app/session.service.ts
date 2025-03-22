import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private userName: string = '';
  private userNameSubject = new Subject<any>();

  constructor() { }

  getUserName(): string {
    return this.userName;
  }

  logIn(userName: string): void {
    if (this.userName !== '') {
      throw new Error('A user is already logged in.');
    }
    if (userName.trim() === '') {
      throw new Error('The provided user name was blank.');
    }
    this.userName = userName;
    this.userNameSubject.next(this.userName);
  }

  logOut(): void {
    if (this.userName === '') {
      throw new Error('There is no user logged in.');
    }
    this.userName = '';
    this.userNameSubject.next(this.userName);
  }

  onUserNameChanged(): Observable<any> {
    return this.userNameSubject.asObservable();
  }
}
