import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonContent, IonList, IonItem, IonItemSliding, IonItemOptions, IonItemOption,
  IonCheckbox, IonNote, IonButton, IonIcon, IonFab, IonFabButton, IonModal,
  IonInput, IonSelect, IonSelectOption, IonToast, CheckboxCustomEvent,
} from '@ionic/angular';
import { LISTA_COMPRA } from '../../datos/lista-compra';
import { LineaCompra, SeccionCompra } from '../../modelos/lista-compra';
import { EstadoVacioComponent } from '../../componentes/estado-vacio/estado-vacio.component';

const SECCIONES: SeccionCompra[] = ['Proteínas', 'Verduras', 'Despensa'];

@Component({
  selector: 'app-compra',
  templateUrl: './compra.page.html',
  styleUrls: ['./compra.page.scss'],
  imports: [
    RouterLink, IonContent, IonList, IonItem, IonItemSliding, IonItemOptions, IonItemOption,
    IonCheckbox, IonNote, IonButton, IonIcon, IonFab, IonFabButton, IonModal,
    IonInput, IonSelect, IonSelectOption, IonToast, EstadoVacioComponent,
  ],
})
export class CompraPage {
  secciones = SECCIONES;

  lineas = signal<LineaCompra[]>(LISTA_COMPRA);
  modalAbierto = signal(false);
  aviso = signal(false);                        // mensaje de «Lista guardada»

  // Campos de la ventana «Añadir artículo»
  nuevoNombre = signal('');
  nuevaCantidad = signal(1);
  nuevaUnidad = signal('uds');
  nuevaSeccion = signal<SeccionCompra>('Verduras');

  pendientes = computed(() => this.lineas().filter(l => !l.comprado).length);
  hayComprados = computed(() => this.lineas().some(l => l.comprado));

  // Agrupa las líneas por sección y descarta las secciones vacías
  grupos = computed(() =>
    SECCIONES
      .map(nombre => ({ nombre, lineas: this.lineas().filter(l => l.seccion === nombre) }))
      .filter(g => g.lineas.length > 0)
  );

  marcar(id: number, evento: CheckboxCustomEvent) {
    this.lineas.update(lista =>
      lista.map(l => (l.id === id ? { ...l, comprado: evento.detail.checked } : l))
    );
  }

  quitar(id: number) {
    this.lineas.update(lista => lista.filter(l => l.id !== id));
  }

  limpiarComprados() {
    this.lineas.update(lista => lista.filter(l => !l.comprado));
  }

  guardar() {
    // Maqueta: en la Entrega 2 será PATCH /listas-compra/{id}/cerrar (RN-06)
    this.aviso.set(true);
  }

  cambiarNombre(valor: unknown) { this.nuevoNombre.set(String(valor ?? '')); }
  cambiarCantidad(valor: unknown) {
    const n = Number(valor);
    this.nuevaCantidad.set(n > 0 ? n : 1);
  }
  cambiarUnidad(valor: unknown) { this.nuevaUnidad.set(String(valor)); }
  cambiarSeccion(valor: unknown) { this.nuevaSeccion.set(valor as SeccionCompra); }

  anadir() {
    const nombre = this.nuevoNombre().trim();
    if (!nombre) return;

    const id = Math.max(0, ...this.lineas().map(l => l.id)) + 1;
    this.lineas.update(lista => [
      ...lista,
      {
        id, nombre,
        cantidad: this.nuevaCantidad(),
        unidad: this.nuevaUnidad(),
        seccion: this.nuevaSeccion(),
        comprado: false,
      },
    ]);

    this.nuevoNombre.set('');
    this.nuevaCantidad.set(1);
    this.modalAbierto.set(false);
  }
}
