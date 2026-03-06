import { NgModule } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { App } from './app';
import { AppModule } from './app-module';
import { serverRoutes } from './app.routes.server';
import { FacebookLoginProvider, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';

@NgModule({
  imports: [AppModule],
  providers: [
    provideServerRendering(withRoutes(serverRoutes)),
    {
      provide: 'SocialAuthServiceConfig',
      useValue: null
    }
  ],
  bootstrap: [App],
})
export class AppServerModule {}
