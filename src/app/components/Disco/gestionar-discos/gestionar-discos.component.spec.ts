import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarDiscosComponent } from './gestionar-discos.component';

describe('GestionarDiscosComponent', () => {
  let component: GestionarDiscosComponent;
  let fixture: ComponentFixture<GestionarDiscosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionarDiscosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionarDiscosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
