import { Injectable, Inject, PLATFORM_ID, Optional, Injector } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SocialAuthService, FacebookLoginProvider } from '@abacritt/angularx-social-login';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';

// export const fbAuthConfig: AuthConfig = {
//   loginUrl: 'https://www.facebook.com/v15.0/dialog/oauth',
//   redirectUri: 'http://localhost:4200/callback',
//   clientId: '876631571861830',
//   responseType: 'token',  // or 'code' if you use server-side exchange
//   scope: 'email public_profile',
//   showDebugInformation: true
// };

@Injectable({ providedIn: 'root' })
export class FacebookAuthService {
  private FB_APP_ID = '876631571861830';
  private REDIRECT_URI = 'http://localhost:4200/callback'; 


  getFacebookURL() {
    console.log('Redirecting...')
    const state = Math.random().toString(36).substring(2); // optional CSRF protection
    const scope = 'email';
    
    const url = new URL('https://www.facebook.com/v18.0/dialog/oauth');
    url.searchParams.set('client_id', this.FB_APP_ID);
    url.searchParams.set('redirect_uri', this.REDIRECT_URI);
    url.searchParams.set('state', state);
    url.searchParams.set('scope', scope);
    url.searchParams.set('response_type', 'code'); // important

    console.log(url.toString())
    
    return url.toString();
  }

  // constructor(private oauthService: OAuthService) {
  //   this.oauthService.configure(fbAuthConfig);
  //   // this.oauthService.loadDiscoveryDocumentAndTryLogin();
  // }

  // loginWithFacebook() {
  //     try {
  //     // this.loggedIn.next(true)
  //     // Generate and pass a custom state to oauth to guard against manual navigation to callback and token farming
  //     // const state = Math.random().toString(36).substring(7)
  //     // sessionStorage.setItem('oauth_state', state)
  //     this.oauthService.initLoginFlow(); // triggers FB login
  //   } catch (error) {
  //     // this.loggedIn.next(false)
  //     console.log("Couldn't auth with google: ", error)
  //   }
  // }
  // private authService: SocialAuthService | null = null;

  // constructor(
  //   @Inject(PLATFORM_ID) private platformId: Object,
  //   private injector: Injector
  // ) {
  //   if (isPlatformBrowser(this.platformId)) {
  //     try {
  //       this.authService = this.injector.get(SocialAuthService);
  //     } catch (err) {
  //       console.warn('SocialAuthService not available in injector', err);
  //       this.authService = null;
  //     }
  //   }
  // }
  // signInWithFB(): void {
  //   if (!this.authService) return; // server → do nothing
  //   this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  // }

  // signOut(): void {
  //   if (!this.authService) return;
  //   this.authService.signOut();
  // }
}