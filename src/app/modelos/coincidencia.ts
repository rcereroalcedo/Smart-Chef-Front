import { Receta } from './receta';

export interface Coincidencia {
  receta: Receta;
  tengo: number;        // ingredientes de la receta que tienes
  total: number;        // ingredientes que lleva la receta
  faltan: string[];     // nombres de los que no tienes
}
