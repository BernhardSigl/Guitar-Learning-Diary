import { Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication/login/authentication.component';
import { RegisterComponent } from './authentication/register/register.component';
import { OverviewComponent } from './mainContent/overview/overview.component';
import { AuthenticationService } from './services/authentication.service';

export const routes: Routes = [
    { path: '', component: AuthenticationComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'overview', component: OverviewComponent, canActivate: [AuthenticationService] },
];
