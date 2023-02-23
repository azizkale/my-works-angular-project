import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  signInForm: FormGroup;
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private authservice: AuthenticationService,
    private http: HttpClient) {
    this.createForm();
  }

  ngOnInit(): void {
  }

  createForm() {
    this.signInForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  signin(email: string, password: any) {

    this.authservice.signin(email, password)
      .subscribe({
        next: async (response) => {

          if (response.status === 200) {
            // If the response status is 200 OK, extract the token from the response
            await localStorage.setItem('token', response.token);
            this.router.navigate(['me']);
          }
        },
        error: (err) => {
          // If the response status is not 200 OK, throw an error
          // document.getElementById('id_alert_signin').innerHTML = "email or password incorrect";
          // document.getElementById('id_alert_signin').style.display = 'block';
        },
        complete: () => { }
      })
  }
}