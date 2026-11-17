import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-barra-nutriente',
  templateUrl: './barra-nutriente.component.html',
  styleUrls: ['./barra-nutriente.component.scss'],
})
export class BarraNutrienteComponent {
  etiqueta = input.required<string>();
  valor = input.required<number>();
  objetivo = input.required<number>();
  unidad = input('g');

  // Cuánto de la barra se rellena, sin pasar nunca del 100 %
  porcentaje = computed(() => Math.min(100, (this.valor() / this.objetivo()) * 100));
}
