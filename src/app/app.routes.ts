import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'homepage',
    pathMatch: 'full'
  },
  {
    path: 'homepage',
    loadComponent: () => import('./pages/homepage/homepage.component').then(m => m.HomepageComponent),
    title: 'Homepage'
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
    title: 'Login'
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent),
    title: 'Cadastro'
  },
  {
    path: 'administration',
    loadComponent: () => import('./pages/administration/administration.component').then(m => m.AdministrationComponent),
    title: 'Administração'
  },
  {
    path: '**',
    redirectTo: 'homepage'
  }
];
