import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonContent, IonIcon } from '@ionic/angular';
import { RECETAS } from '../../datos/recetas';
import { REGISTROS } from '../../datos/registros';
import { Nutricion } from '../../modelos/receta';
import { MOMENTOS, TEXTO_MOMENTO } from '../../modelos/registro-comida';
import { BarraNutrienteComponent } from '../../componentes/barra-nutriente/barra-nutriente.component';
import { EstadoVacioComponent } from '../../componentes/estado-vacio/estado-vacio.component';

const NOMBRES_CORTOS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
const NOMBRES_LARGOS = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'];
const OBJETIVOS = { calorias: 2000, proteinas: 100, hidratos: 300 };   // valores de ejemplo

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
  imports: [RouterLink, IonContent, IonIcon, BarraNutrienteComponent, EstadoVacioComponent],
})
export class HistorialPage {
  readonly hoyIndice = (new Date().getDay() + 6) % 7;     // lunes = 0 … domingo = 6
  objetivos = OBJETIVOS;

  registros = signal(REGISTROS);
  diaElegido = signal(this.hoyIndice);                     // empieza en hoy
  dias = this.crearDias();

  nombreDia = computed(() => NOMBRES_LARGOS[this.diaElegido()]);
  diaFuturo = computed(() => this.diaElegido() > this.hoyIndice);

  // Las tres franjas del día elegido: cada una con su comida o sin ella
  franjas = computed(() =>
    MOMENTOS.map(momento => {
      const r = this.registros().find(
        x => x.diaSemana === this.diaElegido() && x.momento === momento
      );
      const receta = r?.recetaId ? RECETAS.find(x => x.id === r.recetaId) : undefined;
      return {
        momento,
        texto: TEXTO_MOMENTO[momento],
        registro: r
          ? {
            titulo: receta?.titulo ?? r.descripcion ?? 'Comida libre',
            foto: receta?.foto,
            calorias: r.nutricion.calorias,
          }
          : null,
      };
    })
  );

  // Media diaria de los días ya registrados (hasta hoy)
  resumen = computed(() => {
    const hasta = this.hoyIndice;
    const delPeriodo = this.registros().filter(r => r.diaSemana <= hasta);
    const numDias = new Set(delPeriodo.map(r => r.diaSemana)).size || 1;
    const media = (campo: keyof Nutricion) =>
      Math.round(delPeriodo.reduce((total, r) => total + r.nutricion[campo], 0) / numDias);
    return {
      calorias: media('calorias'),
      proteinas: media('proteinas'),
      hidratos: media('hidratos'),
    };
  });

  tieneRegistros(dia: number): boolean {
    return this.registros().some(r => r.diaSemana === dia);
  }

  // Los siete días de esta semana, de lunes a domingo
  private crearDias() {
    const lunes = new Date();
    lunes.setDate(lunes.getDate() - this.hoyIndice);
    return NOMBRES_CORTOS.map((nombre, i) => {
      const dia = new Date(lunes);
      dia.setDate(lunes.getDate() + i);
      return { indice: i, nombre, numero: dia.getDate(), futuro: i > this.hoyIndice };
    });
  }
}
