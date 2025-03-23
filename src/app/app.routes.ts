import { Routes } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { MessagesComponent } from './messages/messages.component';
import { RecordsComponent } from './records/records.component';
import { BillingComponent } from './billing/billing.component';
import { SettingsComponent } from './settings/settings.component';

export const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'login', component: LoginFormComponent },
    { path: 'appointments', component: AppointmentsComponent },
    { path: 'messages', component: MessagesComponent },
    { path: 'records', component: RecordsComponent },
    { path: 'billing', component: BillingComponent },
    { path: 'settings', component: SettingsComponent },
];
