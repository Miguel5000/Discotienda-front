import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarArtistasComponent } from './gestionar-artistas.component';

describe('GestionarArtistasComponent', () => {
  let component: GestionarArtistasComponent;
  let fixture: ComponentFixture<GestionarArtistasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionarArtistasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionarArtistasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
