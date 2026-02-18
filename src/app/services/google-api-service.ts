import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { firstValueFrom } from 'rxjs';

const oAuthConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  strictDiscoveryDocumentValidation: false,
  redirectUri: 'http://localhost:4200/dashboard',
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
  private http: HttpClient = inject(HttpClient)
  private baseURL = 'http://localhost:3000'

  constructor(private oauthService: OAuthService) {
    console.log("I run inside the constructor")
    this.oauthService.configure(oAuthConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  async authWithGoogle() {
    try {

    // this.oAuthService.configure(oAuthConfig)
    this.oAuthService.initCodeFlow()
      // await this.oAuthService.loadDiscoveryDocument()
  //     await this.oAuthService.tryLoginCodeFlow()
  //     // window.history.replaceState({}, document.title, window.location.pathname);

  //     if (!this.oAuthService.hasValidAccessToken()) {
  //       this.oAuthService.initCodeFlow()
  //       return
  //     } 

  //     const idToken = this.oAuthService.getIdToken();

  //     const body = {
  //       provider: 'google',
  //       id_token: idToken
  //     }

  //     const res = await firstValueFrom(this.http.post<GoogleAuthServerResponse>(`${this.baseURL}/api/auth/login`, body))
  //     console.log("Received OAuth response: ", res)

  //     // if (res.status === 200 && res.token) {
  //     //   localStorage.setItem('jobFToken', res.token)
  //     //   console.log("Received the token: ", res.token)
  //     // } else {
  //     //   console.log("Auth failed")
  //     //   return
  //     // }

  //     const userProfile = await this.oAuthService.loadUserProfile()
  //     console.log(userProfile)
  //     return res
    } catch (error) {
      console.log("Couldn't auth with google: ", error)
    }
  }
}
