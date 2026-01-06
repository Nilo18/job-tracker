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

  async authWithGoogle(): Promise<void> {
    try {
      this.oAuthService.configure(oAuthConfig)

      await this.oAuthService.loadDiscoveryDocument()
      await this.oAuthService.tryLoginImplicitFlow()

      if (!this.oAuthService.hasValidAccessToken()) {
        this.oAuthService.initLoginFlow()
        return
      } 

      const userProfile = await this.oAuthService.loadUserProfile()
      console.log(userProfile)
    } catch (error) {
      console.log("Couldn't auth with google: ", error)
    }
  }
}
