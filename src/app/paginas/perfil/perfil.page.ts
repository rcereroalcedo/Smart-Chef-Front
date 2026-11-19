import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonContent, IonButton, IonIcon, IonList, IonItem, IonLabel, IonToggle, IonModal,
  IonRouterLink, ToggleCustomEvent,
} from '@ionic/angular';

interface Preferencia {
  clave: string;
  texto: string;
  activa: boolean;
}

const ALERGENOS = [
  'Cacahuete', 'Soja', 'Mariscos', 'Frutos secos', 'Leche',
  'Huevo', 'Pescado', 'Gluten', 'Sésamo', 'Apio',
];

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  imports: [
    RouterLink, IonContent, IonButton, IonIcon, IonList, IonItem, IonLabel,
    IonToggle, IonModal, IonRouterLink,
  ],
})
export class PerfilPage {
  nombre = 'Julián Ramírez';
  iniciales = 'JR';
  email = 'julian@smartchef.es';

  // Las cuatro preferencias de tu RN-02 / RN-03
  preferencias = signal<Preferencia[]>([
    { clave: 'sinGluten', texto: 'Sin gluten', activa: false },
    { clave: 'economica', texto: 'Económico', activa: true },
    { clave: 'vegetariana', texto: 'Vegetariano', activa: false },
    { clave: 'rapida', texto: 'Rápido', activa: true },
  ]);

  excluidos = signal<string[]>(['Cacahuete', 'Soja', 'Mariscos']);
  panelAbierto = signal(false);
  creditosAbiertos = signal(false);

  // El interruptor empieza como esté la app: si ya estaba oscura, aparece encendido
  modoOscuro = signal(document.documentElement.classList.contains('ion-palette-dark'));

  cambiarPreferencia(clave: string, evento: ToggleCustomEvent) {
    this.preferencias.update(lista =>
      lista.map(p => (p.clave === clave ? { ...p, activa: evento.detail.checked } : p))
    );
  }

  quitar(nombre: string) {
    this.excluidos.update(lista => lista.filter(x => x !== nombre));
  }

  anadir(nombre: string) {
    this.excluidos.update(lista => [...lista, nombre]);
  }

  disponibles() {
    return ALERGENOS.filter(a => !this.excluidos().includes(a));
  }

  cambiarTema(evento: ToggleCustomEvent) {
    const activado = evento.detail.checked;
    this.modoOscuro.set(activado);
    document.documentElement.classList.toggle('ion-palette-dark', activado);
  }
}
