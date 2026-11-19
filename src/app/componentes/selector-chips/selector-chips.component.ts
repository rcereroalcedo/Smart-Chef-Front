import { Component, input, output, signal } from '@angular/core';
import { IonIcon } from '@ionic/angular';

@Component({
  selector: 'app-selector-chips',
  templateUrl: './selector-chips.component.html',
  styleUrls: ['./selector-chips.component.scss'],
  imports: [IonIcon],
})
export class SelectorChipsComponent {
  elegidos = input.required<string[]>();
  disponibles = input.required<string[]>();
  vacio = input('Aún no has añadido nada.');

  quitar = output<string>();      // avisa de qué chip se ha quitado
  anadir = output<string>();      // avisa de qué sugerencia se ha elegido

  abierto = signal(false);        // el panel de sugerencias es cosa del propio componente
}
