import { Routes } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { SummaryComponent } from './summary/summary.component';

export const routes: Routes = [
    { path: '', component: SummaryComponent },
    { path: 'login', component: LoginFormComponent },
];
