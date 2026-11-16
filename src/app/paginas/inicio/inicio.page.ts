import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonContent, IonButton, IonIcon, IonBadge, IonSearchbar, IonChip, SearchbarCustomEvent,
} from '@ionic/angular';
import { RECETAS } from '../../datos/recetas';
import { Receta } from '../../modelos/receta';
import { TarjetaRecetaComponent } from '../../componentes/tarjeta-receta/tarjeta-receta.component';
import { EstadoVacioComponent } from '../../componentes/estado-vacio/estado-vacio.component';

type Filtro = 'ECONOMICO' | 'SIN_GLUTEN' | 'RAPIDO' | 'VEGETARIANO';

// "Rápido" y "rapido" deben coincidir: se quitan tildes y mayúsculas
const normalizar = (t: string) =>
  t.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  imports: [
    RouterLink, IonContent, IonButton, IonIcon, IonBadge, IonSearchbar, IonChip,
    TarjetaRecetaComponent, EstadoVacioComponent,
  ],
})
export class InicioPage {
  nombre = 'Julián';
  iniciales = 'JR';
  recetas = RECETAS;

  filtros: { valor: Filtro; texto: string }[] = [
    { valor: 'ECONOMICO', texto: 'Económico' },
    { valor: 'SIN_GLUTEN', texto: 'Sin gluten' },
    { valor: 'RAPIDO', texto: 'Rápido' },
    { valor: 'VEGETARIANO', texto: 'Vegetariano' },
  ];

  // Lo que guarda la página: dos señales
  busqueda = signal('');
  activos = signal<Filtro[]>([]);

  // Lo que se calcula a partir de ellas
  hayFiltros = computed(() => this.busqueda().trim() !== '' || this.activos().length > 0);

  recetasVisibles = computed(() => {
    const texto = normalizar(this.busqueda().trim());
    const activos = this.activos();
    return this.recetas.filter(r =>
      activos.every(f => this.cumple(r, f)) &&
      (normalizar(r.titulo).includes(texto) ||
        r.ingredientes.some(i => normalizar(i.nombre).includes(texto)))
    );
  });

  private cumple(r: Receta, f: Filtro): boolean {
    switch (f) {
      case 'ECONOMICO': return r.economica;
      case 'SIN_GLUTEN': return r.sinGluten;
      case 'RAPIDO': return r.rapida;
      case 'VEGETARIANO': return r.vegetariana;
    }
  }

  buscar(evento: SearchbarCustomEvent) {
    this.busqueda.set(evento.detail.value ?? '');
  }

  alternar(filtro: Filtro) {
    this.activos.update(lista =>
      lista.includes(filtro) ? lista.filter(f => f !== filtro) : [...lista, filtro]
    );
  }

  estaActivo(filtro: Filtro): boolean {
    return this.activos().includes(filtro);
  }

  limpiar() {
    this.busqueda.set('');
    this.activos.set([]);
  }
}
