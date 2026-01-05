import { inject, Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';

const oAuthConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  strictDiscoveryDocumentValidation: false,
  redirectUri: 'http://localhost:4200/dashboard',
  clientId: '507581015842-mnrmq3msprik2iabpub5bd0uq8206m5f.apps.googleusercontent.com',
  scope: 'openid profile email'  
}

@Injectable({
  providedIn: 'root',
})

export class GoogleApiService {
  private readonly oAuthService = inject(OAuthService)

  constructor() { }

  authWithGoogle() {
      this.oAuthService.configure(oAuthConfig)
      this.oAuthService.loadDiscoveryDocument().then(() => {
        this.oAuthService.tryLoginImplicitFlow().then(() => {
          if (!this.oAuthService.hasValidAccessToken()) {
            this.oAuthService.initLoginFlow()
          } else {
            this.oAuthService.loadUserProfile().then((userProfile) => {
              console.log(JSON.stringify(userProfile))
            })
          }
        }).catch(err => console.log("Couldn't do implicit login: ", err))
    }).catch(err => console.log("Couldn't load discovery document: ", err))
  }
}
