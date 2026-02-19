import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CanActivateFn, Router } from '@angular/router';

export const homeGuard: CanActivateFn = (route, state) => {
  const platformId = inject(PLATFORM_ID)
  const router = inject(Router)

  if (isPlatformBrowser(platformId)) {
    const token = localStorage.getItem('jobF_token')

    if (token) {
      return router.createUrlTree(['/dashboard'])
    } 

    return true
  }

  return true
};
