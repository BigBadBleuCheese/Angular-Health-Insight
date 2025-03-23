import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { SessionService } from '../session.service';
import { UserFacingError } from '../user-facing-error';

@Component({
  selector: 'app-login-form',
  imports: [
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {
  private sessionService = inject(SessionService);

  userName: string = '';
  password: string = '';

  onSubmit() {
    try {
      if (!this.password.trim()) {
        throw new UserFacingError('The provided password was blank.');
      }
      this.sessionService.logIn(this.userName);
    } catch (e) {
      if (e instanceof UserFacingError) {
        alert(e.message);
      } else {
        alert('Something went wrong. Please contact support.');
      }
    }
  }
}
