import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  constructor() {
  }

  getRoles(): string[] {
    if (localStorage.getItem('roles') !== '[]') {
      const str = localStorage.getItem('roles');
      const roles: string[] = str!.split(',');
      return roles
    }
    return []
  }
}
