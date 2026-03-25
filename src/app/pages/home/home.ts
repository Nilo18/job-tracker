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
  }
}
