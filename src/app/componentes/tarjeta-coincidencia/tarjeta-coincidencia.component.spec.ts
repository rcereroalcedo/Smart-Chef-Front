import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaCoincidenciaComponent } from './tarjeta-coincidencia.component';

describe('TarjetaCoincidenciaComponent', () => {
  let component: TarjetaCoincidenciaComponent;
  let fixture: ComponentFixture<TarjetaCoincidenciaComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TarjetaCoincidenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
