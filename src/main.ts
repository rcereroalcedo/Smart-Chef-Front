import { bootstrapApplication } from '@angular/platform-browser';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular';
import {
  provideRouter,
  withPreloading,
  PreloadAllModules,
  withComponentInputBinding,
  RouteReuseStrategy
} from '@angular/router';


import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular({ mode: 'ios', backButtonText: 'Atrás' }),
    provideRouter(routes, withPreloading(PreloadAllModules), withComponentInputBinding()),
  ],
});
