import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  @Input() loggedIn: boolean = false
  @Input() userData: any = {}

  private router = inject(Router)

  ngOnInit() {
    console.log("loggedIn value is: ", this.loggedIn)
    console.log("The userData is: ", this.userData)
    console.log(this.userData.picture)
  }

  logout() {
    localStorage.removeItem('jobF_token')
    this.router.navigate(['/'])
  }
}
