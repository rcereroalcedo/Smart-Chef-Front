import { Coleccion } from '../modelos/coleccion';

export const COLECCIONES: Coleccion[] = [
  { id: 1, nombre: 'Favoritas', recetaIds: [1, 2, 4, 5, 6, 7, 8, 9, 11], protegida: true },
  { id: 2, nombre: 'Rápidas', recetaIds: [2, 4, 7, 9], protegida: false },
  { id: 3, nombre: 'Postres', recetaIds: [], protegida: false },      // vacía a propósito
  { id: 4, nombre: 'Entre semana', recetaIds: [1, 5, 6, 8, 11], protegida: false },
];
