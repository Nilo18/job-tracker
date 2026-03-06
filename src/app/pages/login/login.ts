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
  // private authService!: any
  // private authService: SocialAuthService | null = null;

  // Helper functions
  // generateCodeVerifier(length = 128) {
  //   const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
  //   let result = '';
  //   for (let i = 0; i < length; i++) {
  //     result += chars.charAt(Math.floor(Math.random() * chars.length));
  //   }
  //   return result;
  // }

  // async generateCodeChallenge(verifier: string) {
  //   const data = new TextEncoder().encode(verifier);
  //   const digest = await crypto.subtle.digest('SHA-256', data);
  //   return btoa(String.fromCharCode(...new Uint8Array(digest)))
  //     .replace(/\+/g, '-')
  //     .replace(/\//g, '_')
  //     .replace(/=+$/, '');
  // }

  // storeVerifier(verifier: string) {
  //   sessionStorage.setItem('code_verifier', verifier)
  // }

  googleAuth() {
    this.googleApiService.authWithGoogle()
  }

  signInWithFB(): void {
    // if (!this.authService) return; // server → do nothing
    // this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    console.log('fb auth method in component works!')
    const url = this.fbService.getFacebookURL()
    window.location.href=url
  }

  // signOut(): void {
  //   // if (!this.authService) return; // server → do nothing
  //   // this.authService.signOut();
  //   this.fbService.signOut()
  // }
}
