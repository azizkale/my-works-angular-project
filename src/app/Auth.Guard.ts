import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CommonService } from './services/common.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private commonservice: CommonService
    ) { }

    canActivate() {

        return true
    }
}
