export interface Coleccion {
  id: number;
  nombre: string;
  recetaIds: number[];     // la colección guarda los ids de sus recetas
  protegida: boolean;      // "Favoritas" no se puede borrar
}
