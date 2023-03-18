import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { RegisterComponent } from './register/register.component';
import { MeComponent } from './me/me.component';
import { AuthGuard } from './Auth.Guard';
import { GrouplistComponent } from './me/leftmenu/grouplist/grouplist.component';

const routes: Routes = [
  { path: '', component: SigninComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'me', component: MeComponent, canActivate: [AuthGuard] },
  { path: 'grouplist', component: GrouplistComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
