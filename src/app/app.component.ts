import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  restaurant, restaurantOutline,
  homeOutline, home, searchOutline, search,
  heartOutline, heart, calendarOutline, calendar, personOutline, person,
  notificationsOutline, mailOutline, lockClosedOutline, logoGoogle,
  timeOutline, speedometerOutline,
  star, starHalf, starOutline,
  checkmarkCircle, closeCircle, add,
  cartOutline, trashOutline, moonOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor() {
    addIcons({
      restaurant, restaurantOutline,
      homeOutline, home, searchOutline, search,
      heartOutline, heart, calendarOutline, calendar, personOutline, person,
      notificationsOutline, mailOutline, lockClosedOutline, logoGoogle,
      timeOutline, speedometerOutline,
      star, starHalf, starOutline,
      checkmarkCircle, closeCircle, add,
      cartOutline, trashOutline, moonOutline,
    });
  }
}
