export type SeccionCompra = 'Proteínas' | 'Verduras' | 'Despensa';

export interface LineaCompra {
  id: number;
  nombre: string;
  cantidad: number;
  unidad: string;            // texto libre en la maqueta: "g", "kg", "uds", "bot"…
  seccion: SeccionCompra;
  comprado: boolean;
}
