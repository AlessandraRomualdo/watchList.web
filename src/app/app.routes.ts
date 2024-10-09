import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

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
    canActivateChild: [AuthGuard],
    loadComponent: () => import('./pages/administration/administration.component').then(m => m.AdministrationComponent),
    title: 'Administração',
    children: [
      // rotas filhas
      {
        path: 'movie-settings',
        loadComponent: () => import('./pages/administration/movie/movie-settings/movie-settings.component').then(m => m.MovieSettingsComponent),
        title: 'Configurações de Filmes',
      },
      {
        path: 'movie-edit/:id',
        loadComponent: () => import('./pages/administration/movie/movie-edit/movie-edit.component').then(m => m.MovieEditComponent),
        title: 'Edição de Filme',
      },
      {
        path: 'new-movie',
        loadComponent: () => import('./pages/administration/movie/new-movie/new-movie.component').then(m => m.NewMovieComponent),
        title: 'Novo Filme',
      },
      {
        path: 'serie-settings',
        loadComponent: () => import('./pages/administration/serie/serie-settings/serie-settings.component').then(m => m.SerieSettingsComponent),
        title: 'Configurações de Séries',
      },
      {
        path: 'serie-edit/:id',
        loadComponent: () => import('./pages/administration/serie/serie-edit/serie-edit.component').then(m => m.SerieEditComponent),
        title: 'Edição de Série',
      },
      {
        path: 'new-serie',
        loadComponent: () => import('./pages/administration/serie/new-serie/new-serie.component').then(m => m.NewSerieComponent),
        title: 'Nova Série',
      },
      {
        path: 'user-settings',
        loadComponent: () => import('./pages/administration/user/user-settings/user-settings.component').then(m => m.UserSettingsComponent),
        title: 'Configurações de Usuários',
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'homepage'
  }
];

