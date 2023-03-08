import { Injectable, } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor() { }
  alert(text: string, classForColor: string, parentElement: HTMLElement) {
    const alertTemplate = `
    <div #alert
    class="alert ${classForColor} alert-dismissible fade show"
    role="alert"
  >
    <strong>${text}</strong>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>

  `;
    parentElement.innerHTML = alertTemplate;
  }

}
