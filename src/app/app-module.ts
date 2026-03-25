import { APP_INITIALIZER, NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Home } from './pages/home/home';
import { Banner } from './components/banner/banner';
import { SearchBar } from './components/search-bar/search-bar';
import { Dashboard } from './pages/dashboard/dashboard';
import { Register } from './pages/register/register';
import { Login } from './pages/login/login';
import { Settings } from './pages/settings/settings';
import { SearchPage } from './pages/search-page/search-page';
import { Header } from './components/header/header';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { OAuthModule, OAuthService, provideOAuthClient } from 'angular-oauth2-oidc';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { JobApplicationAddModal } from './components/job-application-add-modal/job-application-add-modal';
import { DashboardStats } from './components/dashboard-stats/dashboard-stats';
import { Callback } from './pages/callback/callback';
import { FacebookLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
import { LoggedinHeader } from './components/loggedin-header/loggedin-header';
import { NotFound } from './pages/not-found/not-found';
import { FeaturesSection } from './components/features-section/features-section';
import { CtaBanner } from './components/cta-banner/cta-banner';
import { Footer } from './components/footer/footer'
import { getOAuthConfig } from './services/environment-detector-factory';

function initOAuth(oauthService: OAuthService) {
  return () => {
    const config = getOAuthConfig(); // inject(DOCUMENT) works here
    oauthService.configure(config);
  };
}

@NgModule({
  declarations: [
    App,
    Home,
    Banner,
    SearchBar,
    Dashboard,
    Register,
    Login,
    Settings,
    SearchPage,
    Header,
    JobApplicationAddModal,
    DashboardStats,
    Callback,
    LoggedinHeader,
    NotFound,
    FeaturesSection,
    CtaBanner,
    Footer
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    OAuthModule.forRoot(),
    MatIconModule,
    ReactiveFormsModule,
    SocialLoginModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideClientHydration(withEventReplay()),
    provideOAuthClient(),
    {
      provide: APP_INITIALIZER,
      useFactory: initOAuth,
      deps: [OAuthService],
      multi: true
    }
  ],
  bootstrap: [App]
})
export class AppModule { }

