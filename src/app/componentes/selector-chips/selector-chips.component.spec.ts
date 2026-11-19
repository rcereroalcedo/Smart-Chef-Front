import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorChipsComponent } from './selector-chips.component';

describe('SelectorChipsComponent', () => {
  let component: SelectorChipsComponent;
  let fixture: ComponentFixture<SelectorChipsComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectorChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
