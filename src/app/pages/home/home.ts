import { Component } from '@angular/core';
import { getOAuthConfig } from '../../services/environment-detector-factory';
import { EnvironmentDetector } from '../../services/environment-detector';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  constructor(private environmentDetector: EnvironmentDetector) {
    console.log("Before checking config: ")
    const config = getOAuthConfig()
    console.log("The config is: ", config)
    console.log("After checking config: ")
    console.log("EnvirontmentDetector.isLocalhost() returned: ", this.environmentDetector.isLocalhost())
  }
}
