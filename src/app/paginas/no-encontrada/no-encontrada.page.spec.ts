import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoEncontradaPage } from './no-encontrada.page';

describe('NoEncontradaPage', () => {
  let component: NoEncontradaPage;
  let fixture: ComponentFixture<NoEncontradaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NoEncontradaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
