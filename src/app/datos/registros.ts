import { RegistroComida } from '../modelos/registro-comida';

export const REGISTROS: RegistroComida[] = [
  // Lunes
  { id: 1, diaSemana: 0, momento: 'DESAYUNO', recetaId: 9, nutricion: { calorias: 340, proteinas: 11, hidratos: 55, grasas: 8 } },
  { id: 2, diaSemana: 0, momento: 'COMIDA', recetaId: 7, nutricion: { calorias: 430, proteinas: 18, hidratos: 44, grasas: 20 } },
  { id: 3, diaSemana: 0, momento: 'CENA', recetaId: 8, nutricion: { calorias: 210, proteinas: 9, hidratos: 33, grasas: 5 } },
  // Martes
  { id: 4, diaSemana: 1, momento: 'DESAYUNO', recetaId: 9, nutricion: { calorias: 340, proteinas: 11, hidratos: 55, grasas: 8 } },
  { id: 5, diaSemana: 1, momento: 'COMIDA', recetaId: 4, nutricion: { calorias: 520, proteinas: 16, hidratos: 62, grasas: 24 } },
  { id: 6, diaSemana: 1, momento: 'CENA', recetaId: 8, nutricion: { calorias: 210, proteinas: 9, hidratos: 33, grasas: 5 } },
  // Miércoles (sin cena)
  { id: 7, diaSemana: 2, momento: 'DESAYUNO', recetaId: 9, nutricion: { calorias: 340, proteinas: 11, hidratos: 55, grasas: 8 } },
  { id: 8, diaSemana: 2, momento: 'COMIDA', recetaId: 1, nutricion: { calorias: 636, proteinas: 52, hidratos: 71, grasas: 16 } },
  // Jueves (con comidas libres)
  { id: 9, diaSemana: 3, momento: 'DESAYUNO', descripcion: 'Café con tostada', nutricion: { calorias: 220, proteinas: 6, hidratos: 34, grasas: 6 } },
  { id: 10, diaSemana: 3, momento: 'COMIDA', recetaId: 2, nutricion: { calorias: 720, proteinas: 32, hidratos: 78, grasas: 29 } },
  { id: 11, diaSemana: 3, momento: 'CENA', recetaId: 6, nutricion: { calorias: 160, proteinas: 4, hidratos: 18, grasas: 8 } },
  // Viernes
  { id: 12, diaSemana: 4, momento: 'COMIDA', recetaId: 10, nutricion: { calorias: 580, proteinas: 33, hidratos: 70, grasas: 18 } },
  { id: 13, diaSemana: 4, momento: 'CENA', recetaId: 5, nutricion: { calorias: 190, proteinas: 4, hidratos: 24, grasas: 9 } },
  // Sábado
  { id: 14, diaSemana: 5, momento: 'DESAYUNO', recetaId: 9, nutricion: { calorias: 340, proteinas: 11, hidratos: 55, grasas: 8 } },
  { id: 15, diaSemana: 5, momento: 'COMIDA', recetaId: 3, nutricion: { calorias: 650, proteinas: 34, hidratos: 70, grasas: 25 } },
  { id: 16, diaSemana: 5, momento: 'CENA', descripcion: 'Pizza casera', nutricion: { calorias: 780, proteinas: 30, hidratos: 92, grasas: 30 } },
  // Domingo
  { id: 17, diaSemana: 6, momento: 'COMIDA', recetaId: 11, nutricion: { calorias: 450, proteinas: 9, hidratos: 78, grasas: 11 } },
  { id: 18, diaSemana: 6, momento: 'CENA', recetaId: 7, nutricion: { calorias: 430, proteinas: 18, hidratos: 44, grasas: 20 } },
];
