import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'app',
    pathMatch: 'full',
  },
  {
    path: 'app',
    loadComponent: () => import('./paginas/tabs/tabs.page').then(m => m.TabsPage),
    children: [
      {
        path: 'inicio',
        loadComponent: () => import('./paginas/inicio/inicio.page').then(m => m.InicioPage),
      },
      {
        path: 'buscar',
        loadComponent: () => import('./paginas/buscar/buscar.page').then(m => m.BuscarPage),
      },
      {
        path: 'favoritos',
        loadComponent: () => import('./paginas/favoritos/favoritos.page').then(m => m.FavoritosPage),
      },
      {
        path: 'historial',
        loadComponent: () => import('./paginas/historial/historial.page').then(m => m.HistorialPage),
      },
      {
        path: 'perfil',
        loadComponent: () => import('./paginas/perfil/perfil.page').then(m => m.PerfilPage),
      },
      {
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full',
      },
    ],
  },
];
