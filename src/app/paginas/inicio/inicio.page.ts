import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TarjetaRecetaComponent } from '../../componentes/tarjeta-receta/tarjeta-receta.component';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonIcon, IonButtons
} from '@ionic/angular';
import {RECETAS} from "../../datos/recetas";

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, RouterLink, IonButton, IonIcon, IonButtons, TarjetaRecetaComponent],
})
export class InicioPage {
  recetas = RECETAS;    // la página ya "tiene" las recetas
}
