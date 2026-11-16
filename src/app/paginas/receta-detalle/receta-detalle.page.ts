import { Component, computed, input, signal } from '@angular/core';
import {
  IonHeader, IonToolbar, IonButtons, IonBackButton, IonButton, IonIcon, IonContent,
  IonSegment, IonSegmentButton, IonLabel, IonCheckbox,
  SegmentCustomEvent, CheckboxCustomEvent,
} from '@ionic/angular';
import { RECETAS } from '../../datos/recetas';
import { IngredienteReceta, TEXTO_DIFICULTAD } from '../../modelos/receta';
import { EstadoVacioComponent } from '../../componentes/estado-vacio/estado-vacio.component';

type Seccion = 'ingredientes' | 'preparacion' | 'nutricion';

@Component({
  selector: 'app-receta-detalle',
  templateUrl: './receta-detalle.page.html',
  styleUrls: ['./receta-detalle.page.scss'],
  imports: [
    IonHeader, IonToolbar, IonButtons, IonBackButton, IonButton, IonIcon, IonContent,
    IonSegment, IonSegmentButton, IonLabel, IonCheckbox, EstadoVacioComponent,
  ],
})
export class RecetaDetallePage {
  id = input<string>();                       // viene de la dirección (:id)
  textosDificultad = TEXTO_DIFICULTAD;

  seccion = signal<Seccion>('ingredientes');  // pestaña interna elegida
  marcados = signal<number[]>([]);            // ingredientes con la casilla marcada
  favoritaElegida = signal<boolean | null>(null);

  // Busca la receta cuyo id coincide con el de la dirección
  receta = computed(() => RECETAS.find(r => r.id === Number(this.id())));

  esFavorita = computed(() => this.favoritaElegida() ?? this.receta()?.favorita ?? false);

  // Cinco iconos de estrella a partir de la valoración (4.9 → 5 llenas; 4.6 → 4 y media)
  estrellas = computed(() => {
    const v = this.receta()?.valoracion ?? 0;
    return [1, 2, 3, 4, 5].map(n =>
      v >= n - 0.25 ? 'star' : v >= n - 0.75 ? 'star-half' : 'star-outline'
    );
  });

  cambiarSeccion(evento: SegmentCustomEvent) {
    this.seccion.set(evento.detail.value as Seccion);
  }

  alternarFavorita() {
    this.favoritaElegida.set(!this.esFavorita());
  }

  estaMarcado(id: number): boolean {
    return this.marcados().includes(id);
  }

  marcar(id: number, evento: CheckboxCustomEvent) {
    this.marcados.update(lista =>
      evento.detail.checked ? [...lista, id] : lista.filter(x => x !== id)
    );
  }

  // 200 → "200 g", 0.5 unidades → "0,5"
  cantidad(i: IngredienteReceta): string {
    const n = String(i.cantidad).replace('.', ',');
    switch (i.unidad) {
      case 'GRAMOS': return `${n} g`;
      case 'MILILITROS': return `${n} ml`;
      default: return n;
    }
  }
}
