import { Component, signal, computed  } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonContent, IonButton, IonIcon, IonList, IonItem, IonLabel, IonToggle, IonModal,
  IonRouterLink, ToggleCustomEvent, IonInput, IonInputPasswordToggle, IonToast,
} from '@ionic/angular';
import {SelectorChipsComponent} from "../../componentes/selector-chips/selector-chips.component";

interface Preferencia {
  clave: string;
  texto: string;
  activa: boolean;
}

const ALERGENOS = [
  'Cacahuete', 'Soja', 'Mariscos', 'Frutos secos', 'Leche',
  'Huevo', 'Pescado', 'Gluten', 'Sésamo', 'Apio',
];

interface BorradorPerfil {
  nombre: string;
  email: string;
  claveActual: string;
  claveNueva: string;
  claveRepetida: string;
}

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  imports: [
    RouterLink, IonContent, IonButton, IonIcon, IonList, IonItem, IonLabel,
    IonToggle, IonModal, IonRouterLink, SelectorChipsComponent, IonInput, IonInputPasswordToggle, IonToast,
  ],
})
export class PerfilPage {
  nombre = signal('Julián Ramírez');
  email = signal('julian@smartchef.es');
  editando = signal(false);
  cambiarClave = signal(false);
  perfilGuardado = signal(false);                  // aviso «Perfil actualizado»

// Copia de trabajo: solo se aplica al perfil al pulsar «Guardar cambios»
  borrador = signal<BorradorPerfil>({
    nombre: '', email: '', claveActual: '', claveNueva: '', claveRepetida: '',
  });

  nombreValido = computed(() => this.borrador().nombre.trim().length >= 2);
  emailValido = computed(() =>
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(this.borrador().email.trim())
  );
  claveNuevaValida = computed(() => this.borrador().claveNueva.length >= 8);
  clavesCoinciden = computed(() => this.borrador().claveNueva === this.borrador().claveRepetida);

  claveValida = computed(
    () =>
      !this.cambiarClave() ||
      (this.borrador().claveActual !== '' && this.claveNuevaValida() && this.clavesCoinciden())
  );

  hayCambios = computed(
    () =>
      this.borrador().nombre.trim() !== this.nombre() ||
      this.borrador().email.trim() !== this.email() ||
      this.cambiarClave()
  );

  puedeGuardar = computed(
    () => this.nombreValido() && this.emailValido() && this.claveValida() && this.hayCambios()
  );

  abrirEdicion() {
    this.borrador.set({
      nombre: this.nombre(), email: this.email(),
      claveActual: '', claveNueva: '', claveRepetida: '',
    });
    this.cambiarClave.set(false);
    this.editando.set(true);
  }

// Un único método sirve para cada campo: escribir('email', valor)
  escribir(campo: keyof BorradorPerfil, valor: unknown) {
    this.borrador.update(b => ({ ...b, [campo]: String(valor ?? '') }));
  }

  alternarClave(evento: ToggleCustomEvent) {
    this.cambiarClave.set(evento.detail.checked);
  }

  guardarPerfil() {
    if (!this.puedeGuardar()) return;

    const b = this.borrador();
    this.nombre.set(b.nombre.trim());
    this.email.set(b.email.trim());
    // La contraseña no se guarda aquí: con la API la cambiará el backend
    this.editando.set(false);
    this.perfilGuardado.set(true);
  }

// "Julián Ramírez" → "JR"
  iniciales = computed(() =>
    this.nombre().trim().split(/\s+/).slice(0, 2).map(p => p.charAt(0).toUpperCase()).join('')
  );

  // Las cuatro preferencias de tu RN-02 / RN-03
  preferencias = signal<Preferencia[]>([
    { clave: 'sinGluten', texto: 'Sin gluten', activa: false },
    { clave: 'economica', texto: 'Económico', activa: true },
    { clave: 'vegetariana', texto: 'Vegetariano', activa: false },
    { clave: 'rapida', texto: 'Rápido', activa: true },
  ]);

  excluidos = signal<string[]>(['Cacahuete', 'Soja', 'Mariscos']);
  creditosAbiertos = signal(false);

  // El interruptor empieza como esté la app: si ya estaba oscura, aparece encendido
  modoOscuro = signal(document.documentElement.classList.contains('ion-palette-dark'));

  cambiarPreferencia(clave: string, evento: ToggleCustomEvent) {
    this.preferencias.update(lista =>
      lista.map(p => (p.clave === clave ? { ...p, activa: evento.detail.checked } : p))
    );
  }

  quitar(nombre: string) {
    this.excluidos.update(lista => lista.filter(x => x !== nombre));
  }

  anadir(nombre: string) {
    this.excluidos.update(lista => [...lista, nombre]);
  }

  disponibles = computed(() => ALERGENOS.filter(a => !this.excluidos().includes(a)));

  cambiarTema(evento: ToggleCustomEvent) {
    const activado = evento.detail.checked;
    this.modoOscuro.set(activado);
    document.documentElement.classList.toggle('ion-palette-dark', activado);
  }
}
