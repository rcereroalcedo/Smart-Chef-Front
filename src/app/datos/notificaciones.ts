import { Notificacion } from '../modelos/notificacion';

export const NOTIFICACIONES: Notificacion[] = [
  { id: 1, tipo: 'CADUCIDAD', titulo: 'El pollo caduca mañana', detalle: 'Prueba el pollo al limón con arroz · 09:00', grupo: 'Hoy', leida: false },
  { id: 2, tipo: 'CADUCIDAD', titulo: 'Los huevos caducan en 2 días', detalle: 'Prueba la pasta carbonara · 09:00', grupo: 'Hoy', leida: false },
  { id: 3, tipo: 'LISTA_COMPRA', titulo: 'Lista de la compra actualizada', detalle: 'Se han añadido 3 ingredientes · 12:15', grupo: 'Hoy', leida: false },
  { id: 4, tipo: 'RESUMEN_SEMANAL', titulo: 'Tu resumen de la semana', detalle: 'Media de 1.850 kcal al día · lunes', grupo: 'Esta semana', leida: true },
  { id: 5, tipo: 'RECETA_RETIRADA', titulo: 'Una receta de «Entre semana» se ha retirado', detalle: 'Cebolla caramelizada con arroz · ayer', grupo: 'Esta semana', leida: true },
];
