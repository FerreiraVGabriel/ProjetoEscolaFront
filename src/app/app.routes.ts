import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { StudentsComponent } from './features/students/students.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { SchoolsComponent } from './features/schools/schools.component';



export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'students', component: StudentsComponent, canActivate: [AuthGuard] },
    { path: 'schools', component: SchoolsComponent, canActivate: [AuthGuard] },

];
