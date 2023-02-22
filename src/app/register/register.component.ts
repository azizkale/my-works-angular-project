import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(
    private authservice: AuthenticationService,
    public fb: FormBuilder,
    private router: Router) {
    this.createForm();
  }

  ngOnInit(): void {
  }

  createForm() {
    this.registerForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  register(email: string, password: any) {
    this.authservice.register(email, password)
      .subscribe({
        next: async (response) => {
          if (response.status === 200) {
            await localStorage.setItem('token', response.token);
            this.router.navigate(['me']);
          } else if (response.status === 409) {
            // document.getElementById('id_alert_signin').innerHTML = 'This email is already in use!';
            // document.getElementById('id_alert_signin').style.display = 'block';
          }
        },
        error: (err) => {
          // document.getElementById('id_alert_signin').innerHTML = 'oops! connection problem?';
          //   document.getElementById('id_alert_signin').style.display = 'block';
        },
        complete: () => { }
      })
  }
}