// social-login-browser.module.ts
import { NgModule } from '@angular/core';
import { SocialLoginModule, SocialAuthServiceConfig, FacebookLoginProvider } from '@abacritt/angularx-social-login';

@NgModule({
  imports: [SocialLoginModule],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          { id: FacebookLoginProvider.PROVIDER_ID, provider: new FacebookLoginProvider('YOUR_FB_APP_ID') }
        ],
        onError: err => console.error(err)
      } as SocialAuthServiceConfig
    }
  ]
})
export class SocialLoginBrowserModule {}