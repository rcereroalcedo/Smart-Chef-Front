import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonContent, IonInput, IonButton, IonIcon, IonRouterLink } from '@ionic/angular/';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [IonContent, IonInput, IonButton, IonIcon, RouterLink, IonRouterLink],
})
export class LoginPage {}
