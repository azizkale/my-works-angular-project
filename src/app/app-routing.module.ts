import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { RegisterComponent } from './register/register.component';
import { MeComponent } from './me/me.component';
import { AuthGuard } from './Auth.Guard';
import { GrouplistComponent } from './me/grouplist/grouplist.component';
import { BooktableComponent } from './me/booktable/booktable.component';
import { HatimComponent } from './works/hatim/hatim.component';
import { SettingsComponent } from './settings/settings.component';
import { ShbComponent } from './works/shb/shb.component';
import { PireditComponent } from './works/piredit/piredit.component';
import { ChaptereditComponent } from './works/piredit/chapteredit/chapteredit.component';

const routes: Routes = [
  { path: '', component: MeComponent, pathMatch: 'full' },
  { path: 'signin', component: SigninComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'me', component: MeComponent, canActivate: [AuthGuard], children: [
      { path: '', redirectTo: 'booktable', pathMatch: 'full' },
      { path: 'hatim', component: HatimComponent, canActivate: [AuthGuard] },
      { path: 'booktable', component: BooktableComponent },
      { path: 'grouplist', component: GrouplistComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'shb', component: ShbComponent },
      { path: 'piredit', component: PireditComponent },
      { path: 'chapter/:id', component: ChaptereditComponent },

    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
