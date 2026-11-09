import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'inicio',
    loadComponent: () => import('./paginas/inicio/inicio.page').then( m => m.InicioPage)
  },
  {
    path: 'buscar',
    loadComponent: () => import('./paginas/buscar/buscar.page').then( m => m.BuscarPage)
  },
  {
    path: 'favoritos',
    loadComponent: () => import('./paginas/favoritos/favoritos.page').then( m => m.FavoritosPage)
  },
  {
    path: 'historial',
    loadComponent: () => import('./paginas/historial/historial.page').then( m => m.HistorialPage)
  },
  {
    path: 'registro',
    loadComponent: () => import('./paginas/registro/registro.page').then( m => m.RegistroPage)
  },
  {
    path: 'compra',
    loadComponent: () => import('./paginas/compra/compra.page').then( m => m.CompraPage)
  },
];
