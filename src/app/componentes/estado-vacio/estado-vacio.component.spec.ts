import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoVacioComponent } from './estado-vacio.component';

describe('EstadoVacioComponent', () => {
  let component: EstadoVacioComponent;
  let fixture: ComponentFixture<EstadoVacioComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadoVacioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
