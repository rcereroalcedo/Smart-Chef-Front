import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrarComidaPage } from './registrar-comida.page';

describe('RegistrarComidaPage', () => {
  let component: RegistrarComidaPage;
  let fixture: ComponentFixture<RegistrarComidaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarComidaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
