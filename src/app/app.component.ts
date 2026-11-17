import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular';
import {
  homeOutline, home, searchOutline, search, heartOutline, heart,
  calendarOutline, calendar, personOutline, person,
  notificationsOutline, timeOutline, cartOutline, moonOutline,
  mailOutline, lockClosedOutline, logoGoogle, speedometerOutline,
  checkmarkCircle, closeCircle, add
} from 'ionicons/icons';
import {addIcons} from "ionicons";

addIcons({ homeOutline, home, searchOutline, search, heartOutline, heart,
  calendarOutline, calendar, personOutline, person,
  notificationsOutline, timeOutline, cartOutline, moonOutline,
  mailOutline, lockClosedOutline, logoGoogle, speedometerOutline,
  checkmarkCircle, closeCircle, add});


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor() {}

}
