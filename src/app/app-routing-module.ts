import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Register } from './pages/register/register';
import { Login } from './pages/login/login';
import { SearchPage } from './pages/search-page/search-page';
import { Settings } from './pages/settings/settings';
import { Dashboard } from './pages/dashboard/dashboard';
import { homeGuard } from './guards/home-guard';
import { dashboardGuard } from './guards/dashboard-guard';
import { Callback } from './pages/callback/callback';

const routes: Routes = [
  {path: '', component: Home, canActivate: [homeGuard]},
  {path: 'register', component: Register},
  {path: 'login', component: Login},
  {path: 'search', component: SearchPage},
  {path: 'callback', component: Callback},
  {path: 'settings', component: Settings, canActivate: [dashboardGuard]},
  {path: 'dashboard', component: Dashboard, canActivate: [dashboardGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
