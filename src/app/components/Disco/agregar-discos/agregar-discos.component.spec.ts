import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarDiscosComponent } from './agregar-discos.component';

describe('AgregarDiscosComponent', () => {
  let component: AgregarDiscosComponent;
  let fixture: ComponentFixture<AgregarDiscosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarDiscosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarDiscosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
