import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { SessionService } from './session.service';
import { FooterComponent } from "./footer/footer.component";
import { UserFacingError } from './user-facing-error';

@Component({
  selector: 'app-root',
  imports: [
    RouterModule,
    RouterOutlet,
    MatToolbarModule,
    MatBadgeModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private breakpointObserver = inject(BreakpointObserver);
  private router = inject(Router);
  private sessionService = inject(SessionService);

  @ViewChild('drawer') drawer!: MatSidenav;
  isHandset: boolean = false;
  unreadMessages: number = 3;
  userName: string = '';

  isUserLoggedIn(): boolean {
    return !!this.userName.trim();
  }

  logOut(): void {
    try {
      this.sessionService.logOut();
    } catch (e) {
      if (e instanceof UserFacingError) {
        alert(e.message);
      } else {
        alert('Something went wrong. Please contact support.');
      }
      return;
    }
    this.drawer.close();
  }

  navigateFromDrawer(route: string): void {
    this.router.navigate([route]);
    if (this.isHandset) {
      this.drawer.close();
    }
  }

  ngOnInit(): void {
    this.breakpointObserver.observe(Breakpoints.Handset).subscribe(result => this.isHandset = result.matches);
    this.userName = this.sessionService.getUserName();
    this.sessionService.onUserNameChanged().subscribe(userName => { 
      this.userName = userName;
      this.router.navigate([this.userName ? '/' : '/login']);
    });
    this.sessionService.getMessages().subscribe(messages => this.unreadMessages = messages.filter(message => !message.isRead).length);
    if (!this.userName) {
      this.router.navigate(['/login']);
      return;
    }
  }
}
