import { Component, inject } from '@angular/core';
import { GoogleApiService } from '../../services/google-api-service';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private readonly googleApiService: GoogleApiService = inject(GoogleApiService)
  private readonly oAuthService = inject(OAuthService)

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
}
