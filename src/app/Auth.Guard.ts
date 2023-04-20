import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CommonService } from './services/common.service';

@Injectable()
export class AuthGuard implements CanActivate {
    isAuthenticated: boolean;

    constructor(
        private router: Router,
        private commonservice: CommonService
    ) { }

    canActivate() {
        this.commonservice.tokenExpiringControl().subscribe({
            next: async (response) => {
                if (response.status === 200) {
                    this.isAuthenticated = true;
                }
                else {
                    this.isAuthenticated = false;
                    localStorage.clear()
                    this.router.navigate(['signin']);
                }
            }
        })
        return this.isAuthenticated;
    }
}
