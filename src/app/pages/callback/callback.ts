import { Component, inject, PLATFORM_ID } from '@angular/core';
import { GoogleApiService, GoogleAuthServerResponse } from '../../services/google-api-service';
import { ActivatedRoute, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EnvironmentDetector } from '../../services/environment-detector';

@Component({
  selector: 'app-callback',
  standalone: false,
  templateUrl: './callback.html',
  styleUrl: './callback.scss',
})
export class Callback {
  private authService = inject(GoogleApiService)
  private route = inject(ActivatedRoute)
  private router = inject(Router)
  private platformId = inject(PLATFORM_ID)
  private environmentDetector = inject(EnvironmentDetector)
  private http = inject(HttpClient)
  private baseURL = this.environmentDetector.getBackendBaseURL()

 // callback.component.ts
  async ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const params = new URLSearchParams(window.location.search);
      const returnedState = params.get('state')

      // If state isn't present 
      // the navigation on this page is being done manually without login,
      // In this case force the user back to home to avoid token farming
      if (!returnedState) {
        console.error("RETURNED STATE MISSING, NAVIGATING BACK TO HOME.", returnedState)
        this.router.navigate(['/'])
        return
      }

      const code = params.get('code');
      const codeVerifier = sessionStorage.getItem('PKCE_verifier');

      if (code && codeVerifier) {
        try {
          const res = await firstValueFrom(this.http.post<GoogleAuthServerResponse>(`${this.baseURL}/api/auth/login`, {
            provider: 'google', code, code_verifier: codeVerifier
          }));
          
          localStorage.setItem('jobF_token', res.token);
          
          this.authService.updateAuthStatus(true)
          this.router.navigate(['/dashboard']); 
        } catch (err) {
          this.router.navigate(['/']); // Handle error
        }
      }
    }
  }


}
