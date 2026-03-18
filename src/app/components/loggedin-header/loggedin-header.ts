import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loggedin-header',
  standalone: false,
  templateUrl: './loggedin-header.html',
  styleUrl: './loggedin-header.scss',
})
export class LoggedinHeader {
  private router = inject(Router)
  @Input() userData: any = {}
  
  logout() {
    localStorage.removeItem('jobF_token')
    this.router.navigate(['/'])
  }
}
