import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonHeader, IonToolbar, IonButtons, IonBackButton, IonContent,
  IonInput, IonInputPasswordToggle, IonButton, IonIcon, IonRouterLink,
} from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  imports: [IonHeader, IonToolbar, IonButtons, IonBackButton, IonContent,
    IonInput, IonInputPasswordToggle, IonButton, IonIcon, RouterLink, IonRouterLink],
})
export class RegistroPage {}
