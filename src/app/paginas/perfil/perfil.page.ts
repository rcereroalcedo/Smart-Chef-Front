import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonIcon,
  IonToggle, IonButton, IonRouterLink, ToggleCustomEvent,
} from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonIcon,
    IonToggle, IonButton, RouterLink, IonRouterLink],
})
export class PerfilPage {
  cambiarTema(evento: ToggleCustomEvent) {
    const activado = evento.detail.checked;   // true si el interruptor está encendido
    document.documentElement.classList.toggle('ion-palette-dark', activado);
  }
}
