import { Component, computed, input, linkedSignal, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, IonButton, IonContent,
  IonSegment, IonSegmentButton, IonLabel, IonList, IonItem, IonSelect, IonSelectOption,
  IonInput, IonToggle, IonDatetimeButton, IonDatetime, IonModal, SegmentCustomEvent,
} from '@ionic/angular';
import { RECETAS } from '../../datos/recetas';
import { Momento, MOMENTOS, TEXTO_MOMENTO } from '../../modelos/registro-comida';

@Component({
  selector: 'app-registrar-comida',
  templateUrl: './registrar-comida.page.html',
  styleUrls: ['./registrar-comida.page.scss'],
  imports: [
    RouterLink, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, IonButton, IonContent,
    IonSegment, IonSegmentButton, IonLabel, IonList, IonItem, IonSelect, IonSelectOption,
    IonInput, IonToggle, IonDatetimeButton, IonDatetime, IonModal,
  ],
})
export class RegistrarComidaPage {
  momento = input<string>();                     // llega por la dirección: ?momento=CENA

  recetas = RECETAS;
  momentos = MOMENTOS.map(valor => ({ valor, texto: TEXTO_MOMENTO[valor] }));
  hoy = new Date().toLocaleDateString('sv-SE');  // "2026-11-17": no se admiten fechas futuras (RN-07)

  // Empieza con el momento de la dirección y el usuario puede cambiarlo
  momentoElegido = linkedSignal<Momento>(() => {
    const m = this.momento();
    return m === 'DESAYUNO' || m === 'COMIDA' || m === 'CENA' ? m : 'COMIDA';
  });

  recetaElegida = signal<string | number>('');
  esLibre = computed(() => this.recetaElegida() === 'LIBRE');

  cambiarMomento(evento: SegmentCustomEvent) {
    this.momentoElegido.set(evento.detail.value as Momento);
  }
}
