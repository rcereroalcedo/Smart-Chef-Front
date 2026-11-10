import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',   // al abrir la app, vamos a inicio
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
  {
    path: 'tabs',
    loadComponent: () => import('./paginas/tabs/tabs.page').then( m => m.TabsPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./paginas/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'perfil',
    loadComponent: () => import('./paginas/perfil/perfil.page').then( m => m.PerfilPage)
  },
  {
    path: 'receta-detalle',
    loadComponent: () => import('./paginas/receta-detalle/receta-detalle.page').then( m => m.RecetaDetallePage)
  },
  {
    path: 'notificaciones',
    loadComponent: () => import('./paginas/notificaciones/notificaciones.page').then( m => m.NotificacionesPage)
  },
  {
    path: 'no-encontrada',
    loadComponent: () => import('./paginas/no-encontrada/no-encontrada.page').then( m => m.NoEncontradaPage)
  },
];
