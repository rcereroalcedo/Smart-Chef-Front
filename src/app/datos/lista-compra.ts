import { LineaCompra } from '../modelos/lista-compra';

export const LISTA_COMPRA: LineaCompra[] = [
  { id: 1, nombre: 'Pechuga de pollo', cantidad: 200, unidad: 'g', seccion: 'Proteínas', comprado: false },
  { id: 2, nombre: 'Limones frescos', cantidad: 2, unidad: 'uds', seccion: 'Verduras', comprado: false },
  { id: 3, nombre: 'Cebolla morada', cantidad: 1, unidad: 'ud', seccion: 'Verduras', comprado: true },
  { id: 4, nombre: 'Ajo fresco', cantidad: 1, unidad: 'cabeza', seccion: 'Verduras', comprado: false },
  { id: 5, nombre: 'Arroz jazmín', cantidad: 1, unidad: 'kg', seccion: 'Despensa', comprado: true },
  { id: 6, nombre: 'Aceite de oliva virgen', cantidad: 1, unidad: 'bot', seccion: 'Despensa', comprado: true },
];
