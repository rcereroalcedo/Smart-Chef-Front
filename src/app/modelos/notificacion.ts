export type TipoNotificacion = 'CADUCIDAD' | 'RESUMEN_SEMANAL' | 'RECETA_RETIRADA' | 'LISTA_COMPRA';
export type NivelNotificacion = 'peligro' | 'aviso' | 'info';

// Cada tipo tiene su icono y su color
export const VISUAL_NOTIFICACION: Record<TipoNotificacion, { icono: string; nivel: NivelNotificacion }> = {
  CADUCIDAD: { icono: 'alarm-outline', nivel: 'aviso' },
  RESUMEN_SEMANAL: { icono: 'calendar-outline', nivel: 'info' },
  RECETA_RETIRADA: { icono: 'alert-circle-outline', nivel: 'peligro' },
  LISTA_COMPRA: { icono: 'cart-outline', nivel: 'info' },
};

export interface Notificacion {
  id: number;
  tipo: TipoNotificacion;
  titulo: string;
  detalle: string;
  grupo: 'Hoy' | 'Esta semana';
  leida: boolean;
}
