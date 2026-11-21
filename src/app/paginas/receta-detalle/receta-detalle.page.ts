import { Component, computed, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonBackButton, IonButton, IonIcon, IonContent,
  IonSegment, IonSegmentButton, IonLabel, IonCheckbox,
  IonList, IonItem, IonNote, IonInput, IonModal, IonToast,
  SegmentCustomEvent, CheckboxCustomEvent,
} from '@ionic/angular';
import { RECETAS } from '../../datos/recetas';
import { COLECCIONES } from '../../datos/colecciones';
import { Coleccion } from '../../modelos/coleccion';
import { IngredienteReceta, TEXTO_DIFICULTAD } from '../../modelos/receta';
import { EstadoVacioComponent } from '../../componentes/estado-vacio/estado-vacio.component';

type Seccion = 'ingredientes' | 'preparacion' | 'nutricion';

@Component({
  selector: 'app-receta-detalle',
  templateUrl: './receta-detalle.page.html',
  styleUrls: ['./receta-detalle.page.scss'],
  imports: [
    RouterLink,
    IonBackButton, IonButton, IonIcon, IonContent,
    IonSegment, IonSegmentButton, IonLabel, IonCheckbox,
    IonList, IonItem, IonNote, IonInput, IonModal, IonToast,
    EstadoVacioComponent,
  ],
})
export class RecetaDetallePage {
  id = input<string>();                       // viene de la dirección (:id)
  textosDificultad = TEXTO_DIFICULTAD;

  seccion = signal<Seccion>('ingredientes');
  marcados = signal<number[]>([]);

  // ── Colecciones (maqueta: solo viven mientras la pantalla está abierta) ──
  colecciones = signal<Coleccion[]>(COLECCIONES);
  modalColecciones = signal(false);
  nombreNuevo = signal('');
  avisoColeccion = signal('');                // texto del aviso; vacío = cerrado

  idReceta = computed(() => Number(this.id()));
  receta = computed(() => RECETAS.find(r => r.id === this.idReceta()));

  // El corazón está relleno si la receta está en la colección protegida (Favoritas)
  esFavorita = computed(() =>
    this.colecciones().some(c => c.protegida && c.recetaIds.includes(this.idReceta()))
  );

  numColecciones = computed(() =>
    this.colecciones().filter(c => c.recetaIds.includes(this.idReceta())).length
  );

  textoBotonColecciones = computed(() => {
    const n = this.numColecciones();
    if (n === 0) return 'Guardar en una colección';
    return n === 1 ? 'Guardada en 1 colección' : `Guardada en ${n} colecciones`;
  });

  nombreRepetido = computed(() =>
    this.colecciones().some(c => c.nombre.toLowerCase() === this.nombreNuevo().trim().toLowerCase())
  );
  nombreValido = computed(() => this.nombreNuevo().trim().length > 0 && !this.nombreRepetido());

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
    const favoritas = this.colecciones().find(c => c.protegida);
    if (favoritas) this.cambiarColeccion(favoritas, !this.esFavorita());
  }

  // Marca o desmarca la receta en una colección, respetando las reglas de «Favoritas»
  cambiarColeccion(coleccion: Coleccion, marcada: boolean) {
    const receta = this.idReceta();

    this.colecciones.update(lista =>
      lista.map(c => {
        const tiene = c.recetaIds.includes(receta);

        if (c.id === coleccion.id) {
          if (marcada && !tiene) return { ...c, recetaIds: [...c.recetaIds, receta] };
          if (!marcada && tiene) return { ...c, recetaIds: c.recetaIds.filter(r => r !== receta) };
          return c;
        }
        // Guardar en cualquier colección la añade también a «Favoritas»
        if (marcada && c.protegida && !tiene && !coleccion.protegida) {
          return { ...c, recetaIds: [...c.recetaIds, receta] };
        }
        // Quitarla de «Favoritas» la quita de todas
        if (!marcada && coleccion.protegida && tiene) {
          return { ...c, recetaIds: c.recetaIds.filter(r => r !== receta) };
        }
        return c;
      })
    );

    this.avisoColeccion.set(marcada ? `Guardada en «${coleccion.nombre}»` : `Quitada de «${coleccion.nombre}»`);
  }

  cambiarNombre(valor: unknown) {
    this.nombreNuevo.set(String(valor ?? ''));
  }

  // Crea una colección que ya contiene esta receta (RN-08: nombre único)
  crearColeccion() {
    if (!this.nombreValido()) return;

    const nombre = this.nombreNuevo().trim();
    const receta = this.idReceta();
    const nuevoId = Math.max(0, ...this.colecciones().map(c => c.id)) + 1;

    this.colecciones.update(lista => [
      ...lista.map(c =>
        c.protegida && !c.recetaIds.includes(receta) ? { ...c, recetaIds: [...c.recetaIds, receta] } : c
      ),
      { id: nuevoId, nombre, recetaIds: [receta], protegida: false },
    ]);

    this.nombreNuevo.set('');
    this.avisoColeccion.set(`Guardada en «${nombre}»`);
  }

  // ── Ingredientes ──
  estaMarcado(id: number): boolean {
    return this.marcados().includes(id);
  }

  marcar(id: number, evento: CheckboxCustomEvent) {
    this.marcados.update(lista =>
      evento.detail.checked ? [...lista, id] : lista.filter(x => x !== id)
    );
  }

  cantidad(i: IngredienteReceta): string {
    const n = String(i.cantidad).replace('.', ',');
    switch (i.unidad) {
      case 'GRAMOS': return `${n} g`;
      case 'MILILITROS': return `${n} ml`;
      default: return n;
    }
  }
}
