import { Routes } from '@angular/router';

const detalle = () =>
  import('./paginas/receta-detalle/receta-detalle.page').then(m => m.RecetaDetallePage);
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',     // ahora la app arranca en el login
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./paginas/login/login.page').then(m => m.LoginPage),
  },
  {
    path: 'registro',
    loadComponent: () => import('./paginas/registro/registro.page').then(m => m.RegistroPage),
  },
  {
    path: 'app',
    loadComponent: () => import('./paginas/tabs/tabs.page').then(m => m.TabsPage),
    children: [
      { path: 'inicio', loadComponent: () => import('./paginas/inicio/inicio.page').then(m => m.InicioPage) },
      { path: 'inicio/:id', loadComponent: detalle },
      { path: 'buscar', loadComponent: () => import('./paginas/buscar/buscar.page').then(m => m.BuscarPage) },
      { path: 'buscar/:id', loadComponent: detalle },
      { path: 'favoritos', loadComponent: () => import('./paginas/favoritos/favoritos.page').then(m => m.FavoritosPage) },
      { path: 'favoritos/:id', loadComponent: detalle },
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
