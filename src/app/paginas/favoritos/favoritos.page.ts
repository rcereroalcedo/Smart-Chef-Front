import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonContent, IonChip, IonIcon, IonButton, IonModal, IonInput } from '@ionic/angular';
import { RECETAS } from '../../datos/recetas';
import { COLECCIONES } from '../../datos/colecciones';
import { Coleccion } from '../../modelos/coleccion';
import { TarjetaRecetaComponent } from '../../componentes/tarjeta-receta/tarjeta-receta.component';
import { EstadoVacioComponent } from '../../componentes/estado-vacio/estado-vacio.component';


@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
  imports: [
    RouterLink, IonContent, IonChip, IonIcon, IonButton, IonModal, IonInput,
    TarjetaRecetaComponent, EstadoVacioComponent,
  ],
})
export class FavoritosPage {
  colecciones = signal<Coleccion[]>(COLECCIONES);
  // Empieza en "Favoritas": la colección protegida
  activa = signal<number>(COLECCIONES.find(c => c.protegida)?.id ?? 0);
  modalAbierto = signal(false);
  nombreNuevo = signal('');

  recetasVisibles = computed(() => {
    const ids = this.colecciones().find(c => c.id === this.activa())?.recetaIds ?? [];
    return RECETAS.filter(r => ids.includes(r.id));
  });

  // RN-08: el nombre de colección es único por persona
  nombreRepetido = computed(() =>
    this.colecciones().some(
      c => c.nombre.toLowerCase() === this.nombreNuevo().trim().toLowerCase()
    )
  );

  nombreValido = computed(() => this.nombreNuevo().trim().length > 0 && !this.nombreRepetido());

  cambiarNombre(valor: unknown) {
    this.nombreNuevo.set(String(valor ?? ''));
  }

  abrirModal() {
    this.nombreNuevo.set('');
    this.modalAbierto.set(true);
  }

  crear() {
    if (!this.nombreValido()) return;

    const id = Math.max(0, ...this.colecciones().map(c => c.id)) + 1;
    this.colecciones.update(lista => [
      ...lista,
      { id, nombre: this.nombreNuevo().trim(), recetaIds: [], protegida: false },
    ]);

    this.activa.set(id);               // la colección nueva queda seleccionada
    this.modalAbierto.set(false);
  }
}
