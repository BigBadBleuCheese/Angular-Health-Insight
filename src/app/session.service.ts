import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { UserFacingError } from './user-facing-error';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private userName: string = '';
  private userNameSubject = new Subject<any>();

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
  }

  logOut(): void {
    if (!this.userName) {
      throw new UserFacingError('There is no user logged in.');
    }
    this.userName = '';
    this.userNameSubject.next(this.userName);
  }

  onUserNameChanged(): Observable<any> {
    return this.userNameSubject.asObservable();
  }
}
