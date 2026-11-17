import { Component, computed, signal } from '@angular/core';
import { IonContent, IonButton, IonIcon } from '@ionic/angular';
import { RECETAS } from '../../datos/recetas';
import { INGREDIENTES } from '../../datos/ingredientes';
import { Coincidencia } from '../../modelos/coincidencia';
import { TarjetaCoincidenciaComponent } from '../../componentes/tarjeta-coincidencia/tarjeta-coincidencia.component';
import { EstadoVacioComponent } from '../../componentes/estado-vacio/estado-vacio.component';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.page.html',
  styleUrls: ['./buscar.page.scss'],
  imports: [IonContent, IonButton, IonIcon, TarjetaCoincidenciaComponent, EstadoVacioComponent],
})
export class BuscarPage {
  catalogo = INGREDIENTES;

  // Pollo, arroz, limón, cebolla, ajo, salsa de soja y aceite de oliva
  seleccion = signal<number[]>([1, 2, 3, 4, 5, 6, 23]);
  resultados = signal<Coincidencia[]>(this.calcular([1, 2, 3, 4, 5, 6, 23]));
  pendiente = signal(false);          // ¿has cambiado ingredientes sin volver a buscar?
  catalogoAbierto = signal(false);

  elegidos = computed(() => this.catalogo.filter(i => this.seleccion().includes(i.id)));
  disponibles = computed(() => this.catalogo.filter(i => !this.seleccion().includes(i.id)));

  anadir(id: number) {
    this.seleccion.update(lista => [...lista, id]);
    this.pendiente.set(true);
  }

  quitar(id: number) {
    this.seleccion.update(lista => lista.filter(x => x !== id));
    this.pendiente.set(true);
  }

  alternarCatalogo() {
    this.catalogoAbierto.update(abierto => !abierto);
  }

  buscar() {
    this.resultados.set(this.calcular(this.seleccion()));
    this.pendiente.set(false);
    this.catalogoAbierto.set(false);
  }

  // RN-04: solo recetas de las que tienes MÁS del 50 %, de mayor a menor porcentaje
  private calcular(ids: number[]): Coincidencia[] {
    return RECETAS
      .map(receta => {
        const total = receta.ingredientes.length;
        const tengo = receta.ingredientes.filter(i => ids.includes(i.id)).length;
        const faltan = receta.ingredientes.filter(i => !ids.includes(i.id)).map(i => i.nombre);
        return { receta, tengo, total, faltan };
      })
      .filter(c => c.tengo / c.total > 0.5)
      .sort((a, b) =>
        b.tengo / b.total - a.tengo / a.total || a.receta.tiempoMin - b.receta.tiempoMin
      );
  }
}
