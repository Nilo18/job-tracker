import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Register } from './pages/register/register';
import { Login } from './pages/login/login';
import { SearchPage } from './pages/search-page/search-page';
import { Settings } from './pages/settings/settings';
import { Dashboard } from './pages/dashboard/dashboard';

const routes: Routes = [
  {path: '', component: Home},
  {path: 'register', component: Register},
  {path: 'login', component: Login},
  {path: 'search', component: SearchPage},
  {path: 'settings', component: Settings},
  {path: 'dashboard', component: Dashboard},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
