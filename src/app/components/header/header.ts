import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  @Input() loggedIn: boolean = false
  @Input() userData: any = {}

  ngOnInit() {
    // console.log("loggedIn value is: ", this.loggedIn)
    // console.log("The userData is: ", this.userData)
    // console.log(this.userData.picture)
  }
}
