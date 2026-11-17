import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarraNutrienteComponent } from './barra-nutriente.component';

describe('BarraNutrienteComponent', () => {
  let component: BarraNutrienteComponent;
  let fixture: ComponentFixture<BarraNutrienteComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BarraNutrienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
