import { inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EnvironmentDetector {
  private document = inject(DOCUMENT)

  isLocalhost() {
    console.log("The hostname is: ", this.document.location.hostname)
    return this.document.location.hostname === 'localhost' || this.document.location.hostname === '127.0.0.1'
  }

  getBaseURL() {
    return this.isLocalhost() ? 'http://localhost:4200' : 'https://job-tracker-sage-mu-39.vercel.app'
  }
}
