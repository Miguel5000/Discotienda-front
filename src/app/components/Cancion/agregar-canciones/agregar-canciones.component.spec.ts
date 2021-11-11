import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarCancionesComponent } from './agregar-canciones.component';

describe('AgregarCancionesComponent', () => {
  let component: AgregarCancionesComponent;
  let fixture: ComponentFixture<AgregarCancionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarCancionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarCancionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
