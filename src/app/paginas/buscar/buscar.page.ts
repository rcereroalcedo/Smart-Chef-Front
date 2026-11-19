import { Component, computed, signal } from '@angular/core';
import { IonContent, IonButton } from '@ionic/angular';
import { RECETAS } from '../../datos/recetas';
import { INGREDIENTES } from '../../datos/ingredientes';
import { Coincidencia } from '../../modelos/coincidencia';
import { TarjetaCoincidenciaComponent } from '../../componentes/tarjeta-coincidencia/tarjeta-coincidencia.component';
import { EstadoVacioComponent } from '../../componentes/estado-vacio/estado-vacio.component';
import { SelectorChipsComponent } from '../../componentes/selector-chips/selector-chips.component';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.page.html',
  styleUrls: ['./buscar.page.scss'],
  imports: [IonContent, IonButton, TarjetaCoincidenciaComponent, EstadoVacioComponent, SelectorChipsComponent],
})
export class BuscarPage {
  catalogo = INGREDIENTES;

  // Pollo, arroz, limón, cebolla, ajo, salsa de soja y aceite de oliva
  seleccion = signal<number[]>([1, 2, 3, 4, 5, 6, 23]);

  nombresElegidos = computed(() =>
    this.catalogo.filter(i => this.seleccion().includes(i.id)).map(i => i.nombre)
  );
  nombresDisponibles = computed(() =>
    this.catalogo.filter(i => !this.seleccion().includes(i.id)).map(i => i.nombre)
  );

  // Se recalcula sola cada vez que cambia la selección
  resultados = computed(() => this.calcular(this.seleccion()));

  anadir(id: number) {
    this.seleccion.update(lista => [...lista, id]);
  }

  quitar(id: number) {
    this.seleccion.update(lista => lista.filter(x => x !== id));
  }

  quitarPorNombre(nombre: string) {
    const ingrediente = this.catalogo.find(i => i.nombre === nombre);
    if (ingrediente) this.quitar(ingrediente.id);
  }

  anadirPorNombre(nombre: string) {
    const ingrediente = this.catalogo.find(i => i.nombre === nombre);
    if (ingrediente) this.anadir(ingrediente.id);
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
