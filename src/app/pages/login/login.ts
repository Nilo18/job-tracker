import { Component, inject } from '@angular/core';
import { GoogleApiService } from '../../services/google-api-service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private readonly googleApiService: GoogleApiService = inject(GoogleApiService)

  googleAuth() {
    this.googleApiService.authWithGoogle()
  }
}
