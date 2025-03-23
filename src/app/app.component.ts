import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { SessionService } from './session.service';
import { FooterComponent } from "./footer/footer.component";

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private breakpointObserver = inject(BreakpointObserver);
  userName: string = '';

  constructor(private router: Router, private sessionService: SessionService) {}

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  
  isUserLoggedIn() {
    return this.userName.trim();
  }

  logOut() {
    this.sessionService.logOut();
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.userName = this.sessionService.getUserName();
    this.sessionService.onUserNameChanged().subscribe(userName => this.userName = userName);
    if (!this.userName) {
      this.router.navigate(['/login']);
      return;
    }
  }
}
