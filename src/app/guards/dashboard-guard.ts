import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { GoogleApiService } from '../services/google-api-service';
import { filter, map, take } from 'rxjs';

export const dashboardGuard: CanActivateFn = (route, state) => {
  const platformId = inject(PLATFORM_ID)
  const router = inject(Router)
  const googleApiService = inject(GoogleApiService)

  // if (isPlatformBrowser(platformId)) {
  //   console.log("Running inside browser")
  //   const token = localStorage.getItem('jobF_token')
  //   if (!token) {
  //     console.log("aaa")
  //     return router.createUrlTree(['/'])
  //   } 

  //   return true
  // }
  
  console.log('2. Guard checking status')
  if (!isPlatformBrowser(platformId)) {
    return true; 
  }

  return googleApiService.isAuthenticated$.pipe(
    filter(isReady => isReady !== null),
    take(1),
    map(isAuth => {
      if (isAuth === true) return true
      return router.createUrlTree(['/'])
    })
  )
};
