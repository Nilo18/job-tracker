import { Component, signal } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('jobtracker');

  // constructor(private oauthService: OAuthService) {
  //   // this.oauthService.configure(oAuthConfig);
  //   // this.oauthService.loadDiscoveryDocumentAndTryLogin();
  // }
}
