export type Dificultad = 'FACIL' | 'MEDIA' | 'DIFICIL';
export type Unidad = 'GRAMOS' | 'MILILITROS' | 'UNIDADES';

export interface IngredienteReceta {
  id: number;
  nombre: string;
  cantidad: number;
  unidad: Unidad;
}

export interface Paso {
  orden: number;
  titulo?: string;      // la ? indica que es opcional
  texto: string;
}

export interface Nutricion {
  calorias: number;     // por ración
  proteinas: number;
  hidratos: number;
  grasas: number;
}

export interface Receta {
  id: number;
  titulo: string;
  descripcion: string;
  tiempoMin: number;
  raciones: number;
  dificultad: Dificultad;
  costeRacion: number;          // en el backend es BigDecimal; aquí, number
  nutricion: Nutricion;
  vegetariana: boolean;         // en el backend se calculan (RN-02)
  sinGluten: boolean;
  rapida: boolean;              // tiempoMin <= 30
  economica: boolean;           // costeRacion <= 2.50
  valoracion?: number;          // opcional: sale en tu Figma (4.9)
  favorita: boolean;
  foto: string;
  ingredientes: IngredienteReceta[];
  pasos: Paso[];
}
export const TEXTO_DIFICULTAD: Record<Dificultad, string> = {
  FACIL: 'Fácil',
  MEDIA: 'Media',
  DIFICIL: 'Difícil',
};
