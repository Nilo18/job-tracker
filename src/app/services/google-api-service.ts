import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { EnvironmentDetector } from './environment-detector';
// import { EnvironmentDetector } from './environment-detector';

const oAuthConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  strictDiscoveryDocumentValidation: false,
  redirectUri: 'https://job-tracker-sage-mu-39.vercel.app/callback',
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
  private environmentDetector = inject(EnvironmentDetector)
  private baseURL!: string
  private loggedIn = new BehaviorSubject<boolean | null>(null)
  public isAuthenticated$ = this.loggedIn.asObservable()

  constructor(private oauthService: OAuthService) {
    // this.oauthService.configure(oAuthConfig);
    this.baseURL = this.environmentDetector.getBaseURL()
    console.log("The baseURL is: ", this.baseURL)
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
      this.oAuthService.initCodeFlow()
    } catch (error) {
      this.loggedIn.next(false)
    }
  }

  updateAuthStatus(status: boolean) {
    this.loggedIn.next(status)
  }
}
