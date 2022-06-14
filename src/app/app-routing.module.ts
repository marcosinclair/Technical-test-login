import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { LoginComponent } from './auth/pages/login/login.component';
import { SignupComponent } from './auth/pages/signup/signup.component';
import { UsersListComponent } from './protected/users/users-list/users-list.component';
import { ErrorComponent } from './shared/pages/error/error.component';
import { LogoutComponent } from './auth/pages/logout/logout/logout.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'users', component: UsersListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'logout', component: LogoutComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', pathMatch: 'full' ,component: ErrorComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
