import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { RegisterComponent } from './register/register.component';
import { MeComponent } from './me/me.component';
import { AuthGuard } from './Auth.Guard';
import { GrouplistComponent } from './me/leftmenu/grouplist/grouplist.component';
import { BooktableComponent } from './me/booktable/booktable.component';
import { HatimComponent } from './works/hatim/hatim.component';

const routes: Routes = [
  { path: '', component: MeComponent, pathMatch: 'full' },
  { path: 'signin', component: SigninComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'me/hatim', component: HatimComponent },
  {
    path: 'me', component: MeComponent, canActivate: [AuthGuard], children: [
      { path: '', component: BooktableComponent },
      { path: 'booktable', component: BooktableComponent },
      { path: 'grouplist', component: GrouplistComponent },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
