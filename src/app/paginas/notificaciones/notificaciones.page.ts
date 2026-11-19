import { Component, computed, signal } from '@angular/core';
import {
  IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, IonButton, IonContent,
  IonSegment, IonSegmentButton, IonLabel, IonList, IonItem, IonIcon, SegmentCustomEvent,
} from '@ionic/angular';
import { NOTIFICACIONES } from '../../datos/notificaciones';
import { Notificacion, VISUAL_NOTIFICACION } from '../../modelos/notificacion';
import { EstadoVacioComponent } from '../../componentes/estado-vacio/estado-vacio.component';

type Filtro = 'todas' | 'noLeidas';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.page.html',
  styleUrls: ['./notificaciones.page.scss'],
  imports: [
    IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, IonButton, IonContent,
    IonSegment, IonSegmentButton, IonLabel, IonList, IonItem, IonIcon, EstadoVacioComponent,
  ],
})
export class NotificacionesPage {
  visual = VISUAL_NOTIFICACION;
  notificaciones = signal<Notificacion[]>(NOTIFICACIONES);
  filtro = signal<Filtro>('todas');

  noLeidas = computed(() => this.notificaciones().filter(n => !n.leida).length);

  visibles = computed(() =>
    this.filtro() === 'todas'
      ? this.notificaciones()
      : this.notificaciones().filter(n => !n.leida)
  );

  // Agrupa lo visible por fecha y descarta los grupos vacíos
  grupos = computed(() =>
    (['Hoy', 'Esta semana'] as const)
      .map(nombre => ({ nombre, items: this.visibles().filter(n => n.grupo === nombre) }))
      .filter(g => g.items.length > 0)
  );

  cambiarFiltro(evento: SegmentCustomEvent) {
    this.filtro.set(evento.detail.value as Filtro);
  }

  marcarLeida(id: number) {
    this.notificaciones.update(lista =>
      lista.map(n => (n.id === id ? { ...n, leida: true } : n))
    );
  }

  leerTodas() {
    this.notificaciones.update(lista => lista.map(n => ({ ...n, leida: true })));
  }
}
