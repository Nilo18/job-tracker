import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
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
import { OAuthModule } from 'angular-oauth2-oidc';
import { MatIconModule } from '@angular/material/icon';

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
    Header
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    OAuthModule.forRoot(),
    MatIconModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [App]
})
export class AppModule { }
