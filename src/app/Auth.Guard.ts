import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
    isAuthenticated: boolean;

    constructor(private router: Router) { }

    canActivate() {
        console.log(localStorage.getItem('token'))
        if (localStorage.getItem('token') !== null) {
            this.isAuthenticated = true;
        } else {
            this.isAuthenticated = false;
            this.router.navigate(['signin']);
        }
        return this.isAuthenticated;
    }
}
