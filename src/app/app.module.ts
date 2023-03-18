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

//================ng-bootstrap (https://ng-bootstrap.github.io/)
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';

//================Components=========
import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';
import { RegisterComponent } from './register/register.component';
import { MeComponent } from './me/me.component';
import { BooktableComponent } from './me/booktable/booktable.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BooklistComponent } from './me/leftmenu/booklist/booklist.component';
import { GrouplistComponent } from './me/leftmenu/grouplist/grouplist.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    RegisterComponent,
    BooklistComponent, BooktableComponent,
    MeComponent,
    GrouplistComponent,
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
    NgbPopoverModule
  ],
  providers: [AuthGuard, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
