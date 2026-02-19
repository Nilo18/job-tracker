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
import { ReactiveFormsModule } from '@angular/forms';
import { JobApplicationAddModal } from './components/job-application-add-modal/job-application-add-modal';
import { DashboardStats } from './components/dashboard-stats/dashboard-stats';
import { Callback } from './pages/callback/callback';

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
    Callback
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    OAuthModule.forRoot(),
    MatIconModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [App]
})
export class AppModule { }
