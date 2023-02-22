import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(private authservice: AuthenticationService, public fb: FormBuilder,) {
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
          console.log(response)
          if (response.status === 200) {
            await this.authservice.signin(email, password);
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