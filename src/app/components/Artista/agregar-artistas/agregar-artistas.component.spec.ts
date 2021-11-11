import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarArtistasComponent } from './agregar-artistas.component';

describe('AgregarArtistasComponent', () => {
  let component: AgregarArtistasComponent;
  let fixture: ComponentFixture<AgregarArtistasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarArtistasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarArtistasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
