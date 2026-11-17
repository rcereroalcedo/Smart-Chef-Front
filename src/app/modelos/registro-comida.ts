import { Nutricion } from './receta';

export type Momento = 'DESAYUNO' | 'COMIDA' | 'CENA';

export const MOMENTOS: Momento[] = ['DESAYUNO', 'COMIDA', 'CENA'];

export const TEXTO_MOMENTO: Record<Momento, string> = {
  DESAYUNO: 'Desayuno',
  COMIDA: 'Almuerzo',      // como en tu Figma
  CENA: 'Cena',
};

export interface RegistroComida {
  id: number;
  diaSemana: number;        // 0 = lunes … 6 = domingo (en la API será una fecha)
  momento: Momento;
  recetaId?: number;        // opcional: una comida puede no tener receta
  descripcion?: string;     // texto de la comida libre
  nutricion: Nutricion;
}
