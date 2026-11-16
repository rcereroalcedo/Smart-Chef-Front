import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipEtiquetaComponent } from './chip-etiqueta.component';

describe('ChipEtiquetaComponent', () => {
  let component: ChipEtiquetaComponent;
  let fixture: ComponentFixture<ChipEtiquetaComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ChipEtiquetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
