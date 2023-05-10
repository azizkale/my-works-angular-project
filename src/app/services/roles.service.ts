import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  roles = JSON.parse(localStorage.getItem('roles')!.toString())
  constructor() {
  }

  checkRole(role: string): boolean {
    return this.roles.includes(role)
  }
}
