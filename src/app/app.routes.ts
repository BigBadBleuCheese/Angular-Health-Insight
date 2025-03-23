import { Routes } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MessagesComponent } from './messages/messages.component';

export const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'login', component: LoginFormComponent },
    { path: 'messages', component: MessagesComponent },
];
