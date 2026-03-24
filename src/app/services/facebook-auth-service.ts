import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FacebookAuthService {
  private FB_APP_ID = '876631571861830';
  private REDIRECT_URI = 'http://localhost:4200/callback'; 


  getFacebookURL() {
    const state = Math.random().toString(36).substring(2); // optional CSRF protection
    const scope = 'email';
    
    const url = new URL('https://www.facebook.com/v18.0/dialog/oauth');
    url.searchParams.set('client_id', this.FB_APP_ID);
    url.searchParams.set('redirect_uri', this.REDIRECT_URI);
    url.searchParams.set('state', state);
    url.searchParams.set('scope', scope);
    url.searchParams.set('response_type', 'code'); // important
    
    return url.toString();
  }
}