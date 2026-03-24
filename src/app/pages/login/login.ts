import { Component, Inject, inject, PLATFORM_ID } from '@angular/core';
import { GoogleApiService } from '../../services/google-api-service';
import { OAuthService } from 'angular-oauth2-oidc';
import { FacebookLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login';
import { isPlatformBrowser } from '@angular/common';
import { FacebookAuthService } from '../../services/facebook-auth-service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private readonly googleApiService: GoogleApiService = inject(GoogleApiService)
  private readonly oAuthService = inject(OAuthService)
  private readonly fbService = inject(FacebookAuthService)

  googleAuth() {
    this.googleApiService.authWithGoogle()
  }

  signInWithFB(): void {
    const url = this.fbService.getFacebookURL()
    window.location.href=url
  }
}
