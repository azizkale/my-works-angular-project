import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertsService } from '../services/alerts.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild('alertParent', { static: true }) alertParent: ElementRef

  registerForm: FormGroup;
  passwordPatternControl: string = ''
  emailpatterncontrol: string = ''
  showHideToggle: string = 'visibility';// according to google icons
  passwordType: string = 'password'
  constructor(
    private authservice: AuthenticationService,
    public fb: FormBuilder,
    private router: Router,
    private alertservice: AlertsService) {
    this.createForm();
  }

  ngOnInit(): void {
  }

  createForm() {
    this.registerForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      passwordrepeat: ['', Validators.required]
    });
  }

  register(email: string, password: any, passwordrepeat: any) {
    if (!this.passwordPatternControl.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)) {
      this.alertservice.alert(`<p class='text-start'>
      Password must contain at least <br>
      - one digit, <br>
      - one lowercase letter, <br>
      - one uppercase letter, <br>
      and be at least 8 characters long</p>`, 'alert-danger', this.alertParent.nativeElement)
    }
    else if (!this.emailpatterncontrol.match(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)) {
      this.alertservice.alert(`Please try it again with new email adsress`, 'alert-danger', this.alertParent.nativeElement)
    }
    else if (password !== passwordrepeat) {

      this.alertservice.alert(`Passwords do not match!`, 'alert-danger', this.alertParent.nativeElement)
    }
    else {
      this.authservice.register(email, password)
        .subscribe({
          next: async (response) => {
            if (response.status === 200) {
              this.router.navigate(['signin']);
            } else if (response.status === 409) {
              this.alertservice.alert(`this email is already in use!`, 'alert-danger', this.alertParent.nativeElement)
            }
          },
          error: (err) => {
            this.alertservice.alert(`oops! connection problem?`, 'alert-danger', this.alertParent.nativeElement)
          },
          complete: () => { }
        })
    }

  }
}