import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonCard, IonIcon } from '@ionic/angular';
import { Receta } from '../../modelos/receta';
import { ChipEtiquetaComponent, TipoEtiqueta } from '../chip-etiqueta/chip-etiqueta.component';

@Component({
  selector: 'app-tarjeta-receta',
  templateUrl: './tarjeta-receta.component.html',
  styleUrls: ['./tarjeta-receta.component.scss'],
  imports: [IonCard, IonIcon, RouterLink, ChipEtiquetaComponent],
})
export class TarjetaRecetaComponent {
  receta = input.required<Receta>();    // la receta que tiene que pintar
  ruta = input('/app/inicio');          // entrada opcional, con valor por defecto

  dificultadTexto = computed(() =>
    ({ FACIL: 'Fácil', MEDIA: 'Media', DIFICIL: 'Difícil' })[this.receta().dificultad]
  );

  // Solo se muestra una etiqueta, la más relevante
  etiqueta = computed<TipoEtiqueta | null>(() => {
    const r = this.receta();
    if (r.vegetariana) return 'VEGETARIANO';
    if (r.sinGluten) return 'SIN_GLUTEN';
    if (r.economica) return 'ECONOMICO';
    if (r.rapida) return 'RAPIDO';
    return null;
  });
}
