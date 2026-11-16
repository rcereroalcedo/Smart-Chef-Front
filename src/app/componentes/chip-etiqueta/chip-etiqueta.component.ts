import { Component, input } from '@angular/core';

export type TipoEtiqueta = 'VEGETARIANO' | 'SIN_GLUTEN' | 'ECONOMICO' | 'RAPIDO';

@Component({
  selector: 'app-chip-etiqueta',
  templateUrl: './chip-etiqueta.component.html',
  styleUrls: ['./chip-etiqueta.component.scss'],
})
export class ChipEtiquetaComponent {
  tipo = input.required<TipoEtiqueta>();
}
