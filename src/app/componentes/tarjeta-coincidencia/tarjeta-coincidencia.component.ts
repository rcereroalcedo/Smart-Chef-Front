import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonCard, IonIcon } from '@ionic/angular';
import { Coincidencia } from '../../modelos/coincidencia';

@Component({
  selector: 'app-tarjeta-coincidencia',
  templateUrl: './tarjeta-coincidencia.component.html',
  styleUrls: ['./tarjeta-coincidencia.component.scss'],
  imports: [IonCard, IonIcon, RouterLink],
})
export class TarjetaCoincidenciaComponent {
  coincidencia = input.required<Coincidencia>();
  ruta = input('/app/buscar');

  completa = computed(() => this.coincidencia().tengo === this.coincidencia().total);
}
