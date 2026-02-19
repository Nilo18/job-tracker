import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { BehaviorSubject, firstValueFrom } from 'rxjs';

const oAuthConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  strictDiscoveryDocumentValidation: false,
  redirectUri: 'http://localhost:4200/callback',
  clientId: '507581015842-mnrmq3msprik2iabpub5bd0uq8206m5f.apps.googleusercontent.com',
  scope: 'openid profile email',
  responseType: 'code',
  disableAtHashCheck: true,
  showDebugInformation: true,
  requireHttps: false
}

export interface GoogleAuthServerResponse {
  status: number,
  token: string
}

@Injectable({
  providedIn: 'root',
})

export class GoogleApiService {
  private readonly oAuthService = inject(OAuthService)
  private readonly platformId = inject(PLATFORM_ID)
  private http: HttpClient = inject(HttpClient)
  private baseURL = 'http://localhost:3000'
  private loggedIn = new BehaviorSubject<boolean | null>(null)
  public isAuthenticated$ = this.loggedIn.asObservable()

  constructor(private oauthService: OAuthService) {
    console.log("I run inside the constructor")
    this.oauthService.configure(oAuthConfig);
    this.oauthService.loadDiscoveryDocument();

    if (isPlatformBrowser(this.platformId)) {
      this.checkAuth()
    } else {
      this.loggedIn.next(false) // Default for server
    }
  }

  checkAuth() {
    const token = localStorage.getItem('jobF_token')

    this.loggedIn.next(!!token)
  }

  async authWithGoogle() {
    try {
      // this.loggedIn.next(true)
      // Generate and pass a custom state to oauth to guard against manual navigation to callback and token farming
      // const state = Math.random().toString(36).substring(7)
      // sessionStorage.setItem('oauth_state', state)
      this.oAuthService.initCodeFlow()
    } catch (error) {
      this.loggedIn.next(false)
      console.log("Couldn't auth with google: ", error)
    }
  }

  updateAuthStatus(status: boolean) {
    this.loggedIn.next(status)
  }
}
