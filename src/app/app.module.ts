import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { AuthGuard } from './Auth.Guard';

// ================Angular material modules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon'
import { MatGridListModule } from '@angular/material/grid-list'
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

//================ng-bootstrap (https://ng-bootstrap.github.io/)
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';

//================Components=========
import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';
import { RegisterComponent } from './register/register.component';
import { MeComponent } from './me/me.component';
import { BooktableComponent } from './me/booktable/booktable.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BooklistComponent } from './me/booklist/booklist.component';
import { GrouplistComponent } from './me/grouplist/grouplist.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HatimComponent } from './works/hatim/hatim.component';
import { SettingsComponent } from './settings/settings.component';
import { LeftColumnComponent } from './left-column/left-column.component';
import { ShbComponent } from './works/shb/shb.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    RegisterComponent,
    BooklistComponent,
    BooktableComponent,
    MeComponent,
    GrouplistComponent,
    SidebarComponent,
    HatimComponent,
    SettingsComponent,
    LeftColumnComponent,
    ShbComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    MatIconModule,
    MatGridListModule,
    NgbPopoverModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatProgressSpinnerModule
  ],
  providers: [AuthGuard, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
